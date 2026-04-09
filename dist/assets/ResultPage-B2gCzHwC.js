import{_ as S,a as N,u as $}from"./index-CQJ8oAa-.js";import{u as D}from"./dream-DckNnXX8.js";import{R as I}from"./ResultCard-5yUr-_df.js";import{a as k,s as _,b as R}from"./speech-DF-r657H.js";import{G as x,O as g,H as T,x as l,A as s,J as y,y as q,B as A,D as B,r as c,v as d}from"./vant-BhtChRj4.js";const f={envId:"sunshine20cn-ai",baseUrl:"https://sunshine20cn-ai.service.tcloudbase.com",functionName:"interpret",timeout:3e4};async function E(i){if(!i||i.trim().length<2)throw new Error("梦境描述不能为空");const e=`${f.baseUrl}/${f.functionName}`;try{console.log(`[AI] 调用云函数: ${e}`);const u=new AbortController,v=setTimeout(()=>u.abort(),f.timeout),o=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json","X-Scf-Name":f.functionName},body:JSON.stringify({action:"interpret",dream:i.trim()}),signal:u.signal});if(clearTimeout(v),!o.ok)throw new Error(`HTTP ${o.status}`);const t=await o.json();if(t.success&&t.result)return t.result;throw new Error(t.error||"解梦失败")}catch(u){return console.warn(`[AI] 云函数调用失败: ${u.message}，使用本地兜底`),O(i)}}function O(i){const e=i.toLowerCase();return e.includes("水")||e.includes("河")||e.includes("海")?`梦中见水，寓意财运流动、情感滋润。你近日心情舒畅，工作生活中有新的机遇出现。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("火")||e.includes("火灾")?`梦见火焰，象征热情与能量。你内心充满热情，近期可能有突破性进展。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("蛇")?`梦中见蛇，是智慧与神秘的象征。你潜意识的智慧正在觉醒，会有意想不到的灵感。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("龙")?`龙是中国祥瑞之兽，梦龙主大吉。你近期运势极佳，有贵人相助，诸事顺遂。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("房子")||e.includes("家")||e.includes("房间")?`梦见房屋，象征你的内心世界和安全感。你内心渴望稳定，近期可能会有新的归属感。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("亲人")||e.includes("父母")||e.includes("家人")?`梦见亲人，是思念与牵挂的体现。你与家人缘分深厚，可以主动联系，增进感情。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("飞翔")||e.includes("飞")?`梦中飞翔，象征自由与突破。你内心渴望摆脱束缚，近期会有新的发展空间。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("死亡")||e.includes("去世")||e.includes("棺材")?`梦见死亡，是旧我的消逝与新生的开始。你正在经历蜕变，放下过去，迎接新的人生阶段。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("迷路")||e.includes("找不到")?`梦见迷路，表示你正在寻找方向。不要着急，答案会在行动中逐渐清晰。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("考试")||e.includes("上学")?`梦见考试，是自我检验的象征。你正在为自己的目标努力，相信自己的准备。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("下雨")||e.includes("雨")?`梦见下雨，象征洗涤与新生。春雨润物，寓意困难即将过去，好事将近。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("太阳")||e.includes("阳光")?`梦见阳光明媚，是吉祥如意的象征。你心态积极向上，处处充满希望。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("山")?`梦中山河壮阔，象征心胸开阔，前路光明。你有克服困难的勇气。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("钱")||e.includes("金")?`梦见钱财，寓意财运回升。你对物质生活有了新的期待，勤劳致富是好兆头。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("结婚")||e.includes("婚礼")?`梦见婚嫁，是喜庆与结合的象征。你近期人际关系和谐，可能有好的缘分出现。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("月亮")||e.includes("星星")?`梦见星月，是宁静与美好的象征。你内心平和，近期会有温馨的时光。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("镜子")?`梦见镜子，是自我审视的象征。你对自己有了新的认识。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("花")?`梦见花开，是美好与希望的象征。近期有好事发生。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("猫")||e.includes("狗")||e.includes("鸟")?`梦见小动物，是生活情趣的体现。你内心柔软，近期有小确幸发生。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("汽车")||e.includes("车")?`梦见乘车前行，象征人生旅途的进展。你正朝着目标前进。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("小孩")||e.includes("孩子")?`梦见孩子，是希望与生机的象征。生活中有新的可能等待着你。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("朋友")||e.includes("同学")?`梦见朋友，是人缘的象征。你身边有贵人，近期可多与朋友交流。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:e.includes("吃东西")||e.includes("吃饭")?`梦见进食，是富足与满足的象征。你内心感到充实，近期生活安稳。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:`这个梦境富有深意。梦中的场景往往是我们内心世界的投射。

你近日可能在某些方面有所思考或困扰，这个梦提醒你：保持内心的平静，顺其自然地面对生活中的变化。无论梦境如何，它们反映的是内心的期待与担忧，而非预示未来。

㊗️ 愿你夜夜好眠，日日顺心。`}const j={class:"page result-page"},P={class:"page-header"},U={key:0,class:"loading-state"},L={key:1},V={class:"dream-quote card-paper"},G={class:"quote-text"},H={class:"action-buttons"},J={key:1,class:"no-speech-hint"},M={key:2,class:"error-state"},z={class:"error-text"},F={__name:"ResultPage",setup(i){const e=N(),u=$(),v=D(),o=c(""),t=c(""),m=c(!0),p=c(""),a=c(!1),b=c(!0);x(async()=>{b.value=k();const r=e.query.dream||"";if(!r){u.replace("/");return}o.value=r,m.value=!0,p.value="";try{t.value=await E(r),v.saveDream(r,t.value)}catch(n){console.error("解梦失败:",n),p.value="解读失败，请稍后再试",g("解读失败，请重试")}finally{m.value=!1}});async function w(){if(a.value){_(),a.value=!1;return}if(!k()){g("当前浏览器不支持朗读功能");return}const r=t.value.replace(/[#*_~`]/g,"").replace(/\n{3,}/g,`

`);a.value=!0;try{await R(r)}catch{g("朗读失败")}finally{a.value=!1}}function h(){u.replace({path:"/input",query:{dream:o.value}})}return T(()=>{_()}),(r,n)=>(d(),l("div",j,[s("header",P,[s("button",{class:"back-btn",onClick:n[0]||(n[0]=C=>r.$router.back())},"‹ 返回"),n[2]||(n[2]=s("h1",{class:"page-title serif"},"解梦结果",-1)),n[3]||(n[3]=s("div",{style:{width:"50px"}},null,-1))]),m.value?(d(),l("div",U,[...n[4]||(n[4]=[s("div",{class:"taiji-icon taiji-loading"},"☯️",-1),s("p",{class:"loading-text"},"周公正在解梦...",-1),s("p",{class:"loading-sub"},"请稍候",-1)])])):t.value?(d(),l("div",L,[s("div",V,[n[5]||(n[5]=s("p",{class:"quote-label"},"💭 你梦到的",-1)),s("p",G,y(o.value),1)]),q(I,{content:t.value},null,8,["content"]),s("div",H,[b.value?(d(),l("button",{key:0,class:A(["btn-speak",{speaking:a.value}]),onClick:w},y(a.value?"🔇 停止朗读":"🔊 朗读结果"),3)):(d(),l("p",J,"💡 在手机浏览器中打开可使用朗读功能")),s("button",{class:"btn-secondary",onClick:h}," 💭 重新解梦 "),s("button",{class:"btn-link",onClick:n[1]||(n[1]=C=>r.$router.push("/"))}," 🏠 返回首页 ")])])):p.value?(d(),l("div",M,[n[6]||(n[6]=s("div",{class:"error-icon"},"😔",-1)),s("p",z,y(p.value),1),s("button",{class:"btn-primary",onClick:h},"再试一次")])):B("",!0)]))}},Z=S(F,[["__scopeId","data-v-2163437b"]]);export{Z as default};
