import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';
import { getFirestore, doc, collection, addDoc, getDocs, query, orderBy, limit, runTransaction, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';
const status = document.getElementById('cloudStatus');
if(firebaseConfig.apiKey.startsWith('PASTE_')) {
 status.textContent='온라인 연결 전: firebase-config.js 설정이 필요합니다. 현재는 기기별 연습 모드입니다.';
} else {
 try {
  const app=initializeApp(firebaseConfig), auth=getAuth(app), db=getFirestore(app);
  const ready=new Promise((resolve,reject)=>{
   const unsub=onAuthStateChanged(auth,u=>{if(u){unsub();resolve(u)}},reject);
   signInAnonymously(auth).catch(reject);
  });
  window.bioCloud={
   async save(name,score,answers){
    const u=await ready;
    const attempt={uid:u.uid,nickname:name,score,answers:answers.map(a=>({id:a.id,choice:a.choice,correct:a.correct,elapsedMs:a.elapsedMs})),createdAt:serverTimestamp()};
    await addDoc(collection(db,'attempts'),attempt);
    const ref=doc(db,'leaderboard',u.uid);
    await runTransaction(db,async tx=>{
     const old=await tx.get(ref);
     if(!old.exists()||score>old.data().score) tx.set(ref,{uid:u.uid,nickname:name,score,updatedAt:serverTimestamp()});
    });
   },
   async list(){await ready;const snap=await getDocs(query(collection(db,'leaderboard'),orderBy('score','desc'),limit(100)));return snap.docs.map(d=>[d.data().nickname,{score:d.data().score}]);}
  };
  ready.then(()=>{status.textContent='● 온라인 연결됨 · 전체 참가자 기록 공유 중';}).catch(e=>{status.textContent='Firebase 로그인 실패: '+e.message;window.bioCloud=null;});
 }catch(e){status.textContent='Firebase 설정 오류: '+e.message;}
}
