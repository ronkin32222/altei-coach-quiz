const TELEGRAM_URL="https://t.me/testaletheia_academy_bot?start=diag";
document.querySelectorAll("[data-telegram]").forEach(link=>{link.href=TELEGRAM_URL;link.target="_blank";link.rel="noopener noreferrer";});

const revealItems=document.querySelectorAll(".section-title,.audience-grid article,.levels-orbit,.levels-copy,.result-heading,.result-panel,.final-inner");
revealItems.forEach(item=>item.classList.add("reveal"));
if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("on");observer.unobserve(entry.target);}}),{threshold:.1});
  revealItems.forEach(item=>observer.observe(item));
}else{revealItems.forEach(item=>item.classList.add("on"));}
