(() => {
 'use strict';
 let game={};try{game=JSON.parse(decodeURIComponent(location.hash.slice(1)));}catch{}
 const $=id=>document.getElementById(id),es=game.lang==='es',t=(a,b)=>es?b:a;
 document.documentElement.lang=es?'es':'en';document.title=game.title||'Genesis player';$('opening').textContent=game.title||'Genesis';$('opening-note').textContent=t('Click Start to load your game and enable sound.','Pulsa Iniciar para cargar el juego y activar el sonido.');$('start-game').textContent=t('Start game','Iniciar juego');$('return').textContent=t('Return to games','Volver a los juegos');$('retry').textContent=t('Try again','Intentar otra vez');$('move-label').textContent=t('Move','Mover');$('controls-title').textContent=t('CONTROLS','CONTROLES');$('focus-note').textContent=t('Click the game screen to use the keyboard.','Haz clic en el juego para usar el teclado.');$('escape-note').textContent=t('Esc: return to games','Esc: volver a los juegos');
 const snes=game.console==='snes',system=snes?'SNES':'Genesis';
 window.EJS_forceLegacyCores=true;
 $('system-label').textContent=snes?'SUPER NINTENDO · 16-BIT':'SEGA GENESIS · 16-BIT';
 if(snes){$('controller-image').src='assets/snes-controls.png';$('controller-image').alt='Super Nintendo controller and keyboard controls';$('button-labels').innerHTML='<span>Y / B</span><strong>J / K</strong><span>X / A</span><strong>U / I</strong><span>L / R</span><strong>Q / E</strong><span>Select</span><strong>F</strong>';}
 let loading=false,alive=true,request=null,loadTimer=null;
 const status=(v,error=false)=>{$('status').textContent=v;$('status').classList.toggle('error',error);$('retry').hidden=!error;};
 function fail(error){if(!alive)return;clearTimeout(loadTimer);loading=false;$('cover').hidden=false;$('opening-note').textContent=t('The game could not finish loading. Use Try again below to restart.','El juego no terminó de cargar. Usa Intentar otra vez para reiniciar.');status(t('Could not load the game. ','No se pudo cargar el juego. ')+(error?.message||''),true);$('start-game').disabled=true;}
 async function start(){if(loading)return;loading=true;$('start-game').disabled=true;status(t('Checking the game download…','Comprobando la descarga…'));try{
 const u=new URL(game.url);if(u.protocol!=='https:')throw new Error('HTTPS game URL required.');request=new AbortController();loadTimer=setTimeout(()=>request.abort(),30000);const response=await fetch(u.href,{signal:request.signal});if(!response.ok)throw new Error('HTTP '+response.status);await response.body?.cancel();clearTimeout(loadTimer);if(!alive)return;
 window.EJS_player='#genesis';window.EJS_core=snes?'snes':'segaMD';window.EJS_controlScheme=snes?'snes':'segaMD';window.EJS_gameUrl=u.href;window.EJS_gameName=game.title||'Genesis';window.EJS_pathtodata=new URL('vendor/emulatorjs/',location.href).href;window.EJS_language=es?'es-ES':'en-US';window.EJS_startOnLoaded=true;window.EJS_threads=false;window.EJS_disableAutoLang=false;window.EJS_disableLocalStorage=true;window.EJS_color='#4e86d8';
 // EmulatorJS segaMD maps Genesis A=1, B=0, C=8; Start=3, directions=4..7.
 // Blank all unused keys so defaults cannot also claim J/K/L/H.
 const keys=Object.fromEntries(Array.from({length:30},(_,i)=>[i,{value:'',value2:''}]));
 for(const [index,key]of (snes?[[1,'j'],[0,'k'],[8,'i'],[9,'u'],[10,'q'],[11,'e'],[2,'f'],[3,'h'],[4,'w'],[5,'s'],[6,'a'],[7,'d']]:[[1,'j'],[0,'k'],[8,'l'],[3,'h'],[4,'w'],[5,'s'],[6,'a'],[7,'d']]))keys[index]={value:key,value2:''};
 window.EJS_defaultControls={0:keys,1:{},2:{},3:{}};
 window.EJS_Buttons={playPause:true,restart:true,mute:true,fullscreen:true,settings:false,saveState:false,loadState:false,gamepad:false,cheat:false,volume:true,saveSavFiles:false,loadSavFiles:false,quickSave:false,quickLoad:false,screenshot:false,cacheManager:false,exitEmulation:false,screenRecord:false};
 window.EJS_onGameStart=()=>{const contextButton=window.EJS_emulator?.elements?.bottomBar?.contextMenu?.[0];if(contextButton)contextButton.hidden=true;clearTimeout(loadTimer);document.getElementById('genesis').focus();status(snes?t('Playing. H = Start · J/K = Y/B · U/I = X/A','Jugando. H = Start · J/K = Y/B · U/I = X/A'):t('Playing. H = Start · J = A · K = B · L = C','Jugando. H = Start · J = A · K = B · L = C'));parent.postMessage({type:'game-loaded'},location.origin);};
 window.EJS_onExit=()=>parent.postMessage({type:'close-game'},location.origin);
 $('cover').hidden=true;status(t('Loading the '+system+' emulator…','Cargando el emulador de '+system+'…'));const script=document.createElement('script');script.src=window.EJS_pathtodata+'loader.js';script.onerror=()=>fail(new Error(t('The emulator files are missing. Upload the vendor folder with the site.','Faltan archivos del emulador. Sube la carpeta vendor junto con el sitio.')));document.body.append(script);loadTimer=setTimeout(()=>{fail(new Error(t('Loading timed out. Check the game link and try again.','La carga tardó demasiado. Revisa el enlace del juego e inténtalo otra vez.')));},60000);
 }catch(e){fail(e);}}
 $('genesis').addEventListener('contextmenu',e=>{e.preventDefault();e.stopImmediatePropagation();},true);
 $('start-game').onclick=start;$('retry').onclick=()=>location.reload();$('return').onclick=()=>parent.postMessage({type:'close-game'},location.origin);document.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopImmediatePropagation();parent.postMessage({type:'close-game'},location.origin);}},true);window.addEventListener('pagehide',()=>{alive=false;request?.abort();clearTimeout(loadTimer);});
})();
