// Fond fixe de la page : un dégradé sombre avec trois taches de couleur floues.
// Il est "fixed" pour ne pas bouger quand on défile dans la liste.
const Background = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#0b0a12]">
    <div className="absolute -left-32 -top-32 size-[28rem] rounded-full bg-fuchsia-600/40 blur-3xl" />
    <div className="absolute -right-40 top-1/3 size-[32rem] rounded-full bg-indigo-600/40 blur-3xl" />
    <div className="absolute -bottom-40 left-1/4 size-[26rem] rounded-full bg-orange-500/25 blur-3xl" />
  </div>
);

export default Background;
