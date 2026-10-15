document.addEventListener('DOMContentLoaded', function () {
  const toggleButtons = document.querySelectorAll('.package-toggle-btn');
  const panels = document.querySelectorAll('.package-panel');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.packageTarget;

      toggleButtons.forEach(b => {
        const active = b === btn;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      panels.forEach(panel => {
        panel.classList.toggle('active', panel.dataset.packagePanel === target);
      });
    });
  });
});

document.addEventListener('DOMContentLoaded',function(){
 const m=document.getElementById('trialModal');
 const open=()=>{m.classList.add('is-open');m.setAttribute('aria-hidden','false');document.body.classList.add('trial-modal-lock')};
 const close=()=>{m.classList.remove('is-open');m.setAttribute('aria-hidden','true');document.body.classList.remove('trial-modal-lock')};
 
 m.querySelectorAll('[data-trial-popup="close"]').forEach(el=>el.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
});

document.addEventListener('DOMContentLoaded', function(){
  const modal = document.getElementById('setupWelcome');
  if(!modal) return;

  const dontShow = document.getElementById('setupDontShow');
  const screens = modal.querySelectorAll('[data-setup-screen]');
  const guide = document.getElementById('setupGuide');
  const guideTitle = document.getElementById('setupGuideTitle');
  const guideSteps = document.getElementById('setupGuideSteps');
  const deviceFooter = document.getElementById('setupDeviceFooter');

  const guides = {
    smarttv:{title:'Smart TV Kurulum Rehberi',steps:[
      '<strong>Uygulama Mağazasını Açın</strong><span>Müşteri temsilcimizin size önerdiği uygulamayı indirip cihazınıza kurun.</span>',
      '<strong>Giriş Bilgilerinizi Ekleyin</strong><span>Tarafınıza iletilen kullanıcı bilgilerini uygulamadaki ilgili alanlara eksiksiz şekilde girin.</span>',
      '<strong>Kurulumu Tamamlayın</strong><span>Bilgileriniz yüklendikten sonra uygulamayı yenileyin ve kurulumun tamamlanmasını bekleyin.</span>'
    ]},
    androidtv:{title:'Android TV / TV Box Kurulum Rehberi',steps:[
      '<strong>Uygulama Mağazasını Açın</strong><span>Müşteri temsilcimizin size önerdiği uygulamayı indirip cihazınıza kurun.</span>',
      '<strong>Giriş Bilgilerinizi Ekleyin</strong><span>Tarafınıza iletilen kullanıcı bilgilerini uygulamadaki ilgili alanlara eksiksiz şekilde girin.</span>',
      '<strong>Kurulumu Tamamlayın</strong><span>Bilgileriniz yüklendikten sonra uygulamayı yenileyin ve kurulumun tamamlanmasını bekleyin.</span>'
    ]},
    android:{title:'Android Telefon / Tablet Kurulum Rehberi',steps:[
      '<strong>Uygulama Mağazasını Açın</strong><span>Müşteri temsilcimizin size önerdiği uygulamayı indirip cihazınıza kurun.</span>',
      '<strong>Giriş Bilgilerinizi Ekleyin</strong><span>Tarafınıza iletilen kullanıcı bilgilerini uygulamadaki ilgili alanlara eksiksiz şekilde girin.</span>',
      '<strong>Kurulumu Tamamlayın</strong><span>Bilgileriniz yüklendikten sonra uygulamayı yenileyin ve kurulumun tamamlanmasını bekleyin.</span>'
    ]},
    ios:{title:'iPhone / iPad Kurulum Rehberi',steps:[
      '<strong>App Store’u Açın</strong><span>Müşteri temsilcimizin size önerdiği uygulamayı indirip cihazınıza kurun.</span>',
      '<strong>Giriş Bilgilerinizi Ekleyin</strong><span>Tarafınıza iletilen kullanıcı bilgilerini uygulamadaki ilgili alanlara eksiksiz şekilde girin.</span>',
      '<strong>Kurulumu Tamamlayın</strong><span>Bilgileriniz yüklendikten sonra uygulamayı yenileyin ve kurulumun tamamlanmasını bekleyin.</span>'
    ]},
    pc:{title:'Windows / Mac Kurulum Rehberi',steps:[
      '<strong>Uygulamayı Kurun</strong><span>Müşteri temsilcimizin size önerdiği uygulamayı bilgisayarınıza indirip kurun.</span>',
      '<strong>Giriş Bilgilerinizi Ekleyin</strong><span>Tarafınıza iletilen kullanıcı bilgilerini uygulamadaki ilgili alanlara eksiksiz şekilde girin.</span>',
      '<strong>Kurulumu Tamamlayın</strong><span>Bilgileriniz yüklendikten sonra uygulamayı yenileyin ve kurulumun tamamlanmasını bekleyin.</span>'
    ]}
  };

  function showScreen(name){
    screens.forEach(s => s.classList.toggle('active', s.dataset.setupScreen === name));
  }
  function rememberChoice(){
    if(dontShow && dontShow.checked) localStorage.setItem('primeSetupWelcomeDismissed','1');
  }
  function openModal(){
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('setup-lock');
  }
  function closeModal(){
    rememberChoice();
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('setup-lock');
  }

  modal.querySelectorAll('[data-setup-close]').forEach(el => el.addEventListener('click', closeModal));
  modal.querySelector('[data-setup-next="devices"]').addEventListener('click', () => showScreen('devices'));

  modal.querySelectorAll('[data-device]').forEach(btn => {
    btn.addEventListener('click', () => {
      const data = guides[btn.dataset.device];
      guideTitle.textContent = data.title;
      guideSteps.innerHTML = data.steps.map(step => '<li>'+step+'</li>').join('');
      guide.hidden = false;
      deviceFooter.style.display = 'none';
    });
  });

  modal.querySelector('[data-setup-back]').addEventListener('click', () => {
    guide.hidden = true;
    deviceFooter.style.display = '';
  });

  modal.querySelector('[data-setup-back-welcome]').addEventListener('click', () => {
    guide.hidden = true;
    deviceFooter.style.display = '';
    showScreen('welcome');
  });

  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  if(localStorage.getItem('primeSetupWelcomeDismissed') !== '1'){
    setTimeout(openModal, 17000);
  }
});

document.addEventListener('DOMContentLoaded',function(){
  const modal=document.getElementById('setupWelcome');
  document.querySelectorAll('[data-open-setup]').forEach(function(btn){
    btn.addEventListener('click',function(){
      if(!modal)return;
      modal.querySelectorAll('[data-setup-screen]').forEach(function(s){
        s.classList.toggle('active',s.dataset.setupScreen==='welcome');
      });
      const guide=document.getElementById('setupGuide');
      const footer=document.getElementById('setupDeviceFooter');
      if(guide)guide.hidden=true;
      if(footer)footer.style.display='';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden','false');
      document.body.classList.add('setup-lock');
    });
  });
});

document.addEventListener('DOMContentLoaded',function(){
  const modal=document.getElementById('setupWelcome');
  if(!modal)return;

  document.querySelectorAll('[data-open-setup]').forEach(function(btn){
    /* Replace the V40 button with a clone to remove the old welcome-screen listener */
    const clone=btn.cloneNode(true);
    btn.parentNode.replaceChild(clone,btn);

    clone.addEventListener('click',function(e){
      e.preventDefault();

      modal.querySelectorAll('[data-setup-screen]').forEach(function(screen){
        screen.classList.toggle('active',screen.dataset.setupScreen==='devices');
      });

      const guide=document.getElementById('setupGuide');
      const footer=document.getElementById('setupDeviceFooter');
      if(guide)guide.hidden=true;
      if(footer)footer.style.display='';

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden','false');
      document.body.classList.add('setup-lock');
    });
  });
});

