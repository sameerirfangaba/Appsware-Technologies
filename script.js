/* Appsware Technologies — Shared JS */
(function(){
  'use strict';

  /* Loader (home only) */
  window.addEventListener('load',()=>{
    const l=document.getElementById('loader');
    if(l)setTimeout(()=>l.classList.add('hide'),1400);
  });

  /* Mobile nav */
  const burger=document.querySelector('.hamburger');
  const links=document.querySelector('.nav-links');
  if(burger&&links){
    burger.addEventListener('click',()=>{
      burger.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow=links.classList.contains('open')?'hidden':'';
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      burger.classList.remove('open');
      links.classList.remove('open');
      document.body.style.overflow='';
    }));
  }

  /* Active link by filename */
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=(a.getAttribute('href')||'').toLowerCase();
    if(href===path||(path===''&&href==='index.html'))a.classList.add('active');
  });

  /* Navbar scroll effect */
  const nav=document.querySelector('.nav');
  if(nav){
    const onScroll=()=>nav.classList.toggle('scrolled',window.scrollY>10);
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();
  }

  /* Scroll reveal */
  const io=new IntersectionObserver((es)=>{
    es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* Counters */
  const cIO=new IntersectionObserver((es)=>{
    es.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target;
      const target=+el.dataset.count;
      const suffix=el.dataset.suffix||'';
      const dur=1600;const start=performance.now();
      const tick=(now)=>{
        const p=Math.min(1,(now-start)/dur);
        const eased=1-Math.pow(1-p,3);
        const cur=Math.round(target*eased);
        el.textContent=cur+suffix;
        if(p<1)requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cIO.unobserve(el);
    });
  },{threshold:.4});
  document.querySelectorAll('[data-count]').forEach(el=>cIO.observe(el));

  /* Typewriter (home hero) */
  const tw=document.querySelector('.typewriter');
  if(tw){
    const phrases=tw.dataset.phrases?tw.dataset.phrases.split('|'):[tw.dataset.text||''];
    tw.innerHTML='<span class="tw-text"></span><span class="cursor"></span>';
    const span=tw.querySelector('.tw-text');
    let pIdx=0,i=0,deleting=false;
    const loop=()=>{
      const cur=phrases[pIdx];
      span.textContent=cur.slice(0,i);
      if(!deleting&&i<cur.length){i++;setTimeout(loop,55);}
      else if(deleting&&i>0){i--;setTimeout(loop,30);}
      else if(!deleting&&i===cur.length){
        if(phrases.length>1){deleting=true;setTimeout(loop,1800);}
      }
      else if(deleting&&i===0){deleting=false;pIdx=(pIdx+1)%phrases.length;setTimeout(loop,400);}
    };
    setTimeout(loop,800);
  }

  /* Parallax hero */
  const heroBg=document.querySelector('.hero-bg');
  const heroOrbs=document.querySelectorAll('.hero-orb');
  if(heroBg||heroOrbs.length){
    let ticking=false;
    window.addEventListener('scroll',()=>{
      if(ticking)return;
      requestAnimationFrame(()=>{
        const y=window.scrollY;
        if(y<window.innerHeight){
          if(heroBg)heroBg.style.transform=`translateY(${y*.3}px)`;
          heroOrbs.forEach((o,i)=>{o.style.transform=`translate(${y*.05*(i?-1:1)}px,${y*.15}px)`;});
        }
        ticking=false;
      });
      ticking=true;
    },{passive:true});
  }

  /* Contact form */
  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      let ok=true;
      const fields=['name','email','message'];
      fields.forEach(f=>{
        const inp=form.querySelector(`[name="${f}"]`);
        const err=form.querySelector(`[data-err="${f}"]`);
        err.textContent='';
        if(!inp.value.trim()){err.textContent='This field is required';ok=false;return;}
        if(f==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)){err.textContent='Please enter a valid email';ok=false;}
        if(f==='message'&&inp.value.trim().length<10){err.textContent='Message must be at least 10 characters';ok=false;}
      });
      if(ok){
        const btn=form.querySelector('button[type="submit"]');
        const orig=btn.textContent;
        btn.textContent='Sending...';btn.disabled=true;
        setTimeout(()=>{
          alert('Thanks! Your message has been received. Our team will get back to you within 24 hours.');
          form.reset();btn.textContent=orig;btn.disabled=false;
        },800);
      }
    });
  }

  /* Newsletter */
  document.querySelectorAll('.newsletter').forEach(n=>{
    n.addEventListener('submit',(e)=>{
      e.preventDefault();
      const i=n.querySelector('input');
      if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)){
        alert('Subscribed! Welcome aboard.');i.value='';
      }else alert('Please enter a valid email address.');
    });
  });

  /* Custom mouse trail (canvas) — desktop only */
  const isTouch=window.matchMedia('(hover:none)').matches||window.innerWidth<=920;
  if(!isTouch){
    const c=document.createElement('canvas');
    c.id='cursor-canvas';
    document.body.appendChild(c);
    const ctx=c.getContext('2d');
    let w,h;
    const resize=()=>{w=c.width=innerWidth;h=c.height=innerHeight;};
    resize();addEventListener('resize',resize);
    document.body.style.cursor='none';
    const trail=[];const maxLen=15;
    let mx=-100,my=-100;let hovering=false;
    addEventListener('mousemove',(e)=>{
      mx=e.clientX;my=e.clientY;
      trail.push({x:mx,y:my});
      if(trail.length>maxLen)trail.shift();
    });
    addEventListener('mouseover',(e)=>{
      hovering=!!e.target.closest('a,button,.btn,.app-card,.team-card,.blog-card,.teaser,input,textarea');
    });
    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      for(let i=1;i<trail.length;i++){
        const p1=trail[i-1],p2=trail[i];
        ctx.strokeStyle=`rgba(255,0,0,${i/trail.length*.85})`;
        ctx.lineWidth=i/trail.length*4;
        ctx.lineCap='round';
        ctx.beginPath();ctx.moveTo(p1.x,p1.y);ctx.lineTo(p2.x,p2.y);ctx.stroke();
      }
      const r=hovering?18:9;
      ctx.beginPath();ctx.arc(mx,my,r,0,Math.PI*2);
      ctx.fillStyle='#fff';
      ctx.shadowColor='rgba(255,0,0,.95)';
      ctx.shadowBlur=hovering?28:14;
      ctx.fill();
      ctx.shadowBlur=0;
      ctx.strokeStyle='#FF0000';
      ctx.lineWidth=2;
      ctx.stroke();
      requestAnimationFrame(draw);
    };
    draw();
  }
})();
