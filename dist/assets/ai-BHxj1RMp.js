const u={envId:"sunshine20cn-ai",baseUrl:"https://sunshine20cn-ai.service.tcloudbase.com",functionName:"interpret",timeout:3e4};async function l(e){if(!e||e.trim().length<2)throw new Error("梦境描述不能为空");const n=`${u.baseUrl}/${u.functionName}`;try{console.log(`[AI] 调用云函数: ${n}`);const i=new AbortController,t=setTimeout(()=>i.abort(),u.timeout),s=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","X-Scf-Name":u.functionName},body:JSON.stringify({action:"interpret",dream:e.trim()}),signal:i.signal});if(clearTimeout(t),!s.ok)throw new Error(`HTTP ${s.status}`);const r=await s.json();if(r.success&&r.result)return r.result;throw new Error(r.error||"解梦失败")}catch(i){return console.warn(`[AI] 云函数调用失败: ${i.message}，使用本地兜底`),c(e)}}function c(e){const n=e.toLowerCase();return n.includes("水")||n.includes("河")||n.includes("海")?`梦中见水，寓意财运流动、情感滋润。你近日心情舒畅，工作生活中有新的机遇出现。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("火")||n.includes("火灾")?`梦见火焰，象征热情与能量。你内心充满热情，近期可能有突破性进展。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("蛇")?`梦中见蛇，是智慧与神秘的象征。你潜意识的智慧正在觉醒，会有意想不到的灵感。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("龙")?`龙是中国祥瑞之兽，梦龙主大吉。你近期运势极佳，有贵人相助，诸事顺遂。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("房子")||n.includes("家")||n.includes("房间")?`梦见房屋，象征你的内心世界和安全感。你内心渴望稳定，近期可能会有新的归属感。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("亲人")||n.includes("父母")||n.includes("家人")?`梦见亲人，是思念与牵挂的体现。你与家人缘分深厚，可以主动联系，增进感情。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("飞翔")||n.includes("飞")?`梦中飞翔，象征自由与突破。你内心渴望摆脱束缚，近期会有新的发展空间。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("死亡")||n.includes("去世")||n.includes("棺材")?`梦见死亡，是旧我的消逝与新生的开始。你正在经历蜕变，放下过去，迎接新的人生阶段。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("迷路")||n.includes("找不到")?`梦见迷路，表示你正在寻找方向。不要着急，答案会在行动中逐渐清晰。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("考试")||n.includes("上学")?`梦见考试，是自我检验的象征。你正在为自己的目标努力，相信自己的准备。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("下雨")||n.includes("雨")?`梦见下雨，象征洗涤与新生。春雨润物，寓意困难即将过去，好事将近。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("太阳")||n.includes("阳光")?`梦见阳光明媚，是吉祥如意的象征。你心态积极向上，处处充满希望。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("山")?`梦中山河壮阔，象征心胸开阔，前路光明。你有克服困难的勇气。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("钱")||n.includes("金")?`梦见钱财，寓意财运回升。你对物质生活有了新的期待，勤劳致富是好兆头。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("结婚")||n.includes("婚礼")?`梦见婚嫁，是喜庆与结合的象征。你近期人际关系和谐，可能有好的缘分出现。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("月亮")||n.includes("星星")?`梦见星月，是宁静与美好的象征。你内心平和，近期会有温馨的时光。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("镜子")?`梦见镜子，是自我审视的象征。你对自己有了新的认识。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("花")?`梦见花开，是美好与希望的象征。近期有好事发生。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("猫")||n.includes("狗")||n.includes("鸟")?`梦见小动物，是生活情趣的体现。你内心柔软，近期有小确幸发生。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("汽车")||n.includes("车")?`梦见乘车前行，象征人生旅途的进展。你正朝着目标前进。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("小孩")||n.includes("孩子")?`梦见孩子，是希望与生机的象征。生活中有新的可能等待着你。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("朋友")||n.includes("同学")?`梦见朋友，是人缘的象征。你身边有贵人，近期可多与朋友交流。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:n.includes("吃东西")||n.includes("吃饭")?`梦见进食，是富足与满足的象征。你内心感到充实，近期生活安稳。

㊗️ 近期运势平稳，保持乐观心态，好运自来。`:`这个梦境富有深意。梦中的场景往往是我们内心世界的投射。

你近日可能在某些方面有所思考或困扰，这个梦提醒你：保持内心的平静，顺其自然地面对生活中的变化。无论梦境如何，它们反映的是内心的期待与担忧，而非预示未来。

㊗️ 愿你夜夜好眠，日日顺心。`}export{l as i};
