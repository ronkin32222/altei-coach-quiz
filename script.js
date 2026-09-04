const TELEGRAM_URL="https://t.me/testaletheia_academy_bot?start=diag";
const CTA_GOALS=["cta_hero","cta_audience","cta_result","cta_final"];
document.querySelectorAll("[data-telegram]").forEach((link,index)=>{
  link.href=TELEGRAM_URL;
  link.target="_blank";
  link.rel="noopener noreferrer";
  link.dataset.metrikaGoal=CTA_GOALS[index]||"cta_other";
  link.addEventListener("click",()=>{
    if(typeof window.ym!=="function")return;
    const params={cta_position:link.dataset.metrikaGoal,cta_text:link.textContent.trim()};
    window.ym(112285719,"reachGoal","cta_all",params);
    window.ym(112285719,"reachGoal",link.dataset.metrikaGoal,params);
  });
});

const revealItems=document.querySelectorAll(".section-title,.audience-grid article,.levels-orbit,.levels-copy,.result-heading,.result-panel,.final-inner");
revealItems.forEach(item=>item.classList.add("reveal"));
if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("on");observer.unobserve(entry.target);}}),{threshold:.1});
  revealItems.forEach(item=>observer.observe(item));
}else{revealItems.forEach(item=>item.classList.add("on"));}
