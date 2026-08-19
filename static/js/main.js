// ---- Navbar scroll shadow ----
const header = document.getElementById('site-header');
function onScroll() {
  if (window.scrollY > 20) {
    header.classList.add('glass', 'shadow-panel', 'border-line');
    header.classList.remove('bg-transparent', 'border-transparent');
  } else {
    header.classList.remove('glass', 'shadow-panel', 'border-line');
    header.classList.add('bg-transparent', 'border-transparent');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Mobile menu toggle ----
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;
function setMenu(open) {
  menuOpen = open;
  mobileMenu.style.display = open ? 'block' : 'none';
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.innerHTML = open
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-6 w-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
}
menuBtn.addEventListener('click', () => setMenu(!menuOpen));
document.querySelectorAll('.mobile-link').forEach((a) =>
  a.addEventListener('click', () => setMenu(false))
);

// ---- Skills tab switching ----
const brandIcons = {
  'python': { path: 'M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z', color: '#3776AB' },
  'html': { path: 'M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z', color: '#E34F26' },
  'css': { path: 'M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63', color: '#1572B6' },
  'git/github': { path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12', color: '#e6edf3' },
  'bash': { path: 'M21.038,4.9l-7.577-4.498C13.009,0.134,12.505,0,12,0c-0.505,0-1.009,0.134-1.462,0.403L2.961,4.9 C2.057,5.437,1.5,6.429,1.5,7.503v8.995c0,1.073,0.557,2.066,1.462,2.603l7.577,4.497C10.991,23.866,11.495,24,12,24 c0.505,0,1.009-0.134,1.461-0.402l7.577-4.497c0.904-0.537,1.462-1.529,1.462-2.603V7.503C22.5,6.429,21.943,5.437,21.038,4.9z M15.17,18.946l0.013,0.646c0.001,0.078-0.05,0.167-0.111,0.198l-0.383,0.22c-0.061,0.031-0.111-0.007-0.112-0.085L14.57,19.29 c-0.328,0.136-0.66,0.169-0.872,0.084c-0.04-0.016-0.057-0.075-0.041-0.142l0.139-0.584c0.011-0.046,0.036-0.092,0.069-0.121 c0.012-0.011,0.024-0.02,0.036-0.026c0.022-0.011,0.043-0.014,0.062-0.006c0.229,0.077,0.521,0.041,0.802-0.101 c0.357-0.181,0.596-0.545,0.592-0.907c-0.003-0.328-0.181-0.465-0.613-0.468c-0.55,0.001-1.064-0.107-1.072-0.917 c-0.007-0.667,0.34-1.361,0.889-1.8l-0.007-0.652c-0.001-0.08,0.048-0.168,0.111-0.2l0.37-0.236 c0.061-0.031,0.111,0.007,0.112,0.087l0.006,0.653c0.273-0.109,0.511-0.138,0.726-0.088c0.047,0.012,0.067,0.076,0.048,0.151 l-0.144,0.578c-0.011,0.044-0.036,0.088-0.065,0.116c-0.012,0.012-0.025,0.021-0.038,0.028c-0.019,0.01-0.038,0.013-0.057,0.009 c-0.098-0.022-0.332-0.073-0.699,0.113c-0.385,0.195-0.52,0.53-0.517,0.778c0.003,0.297,0.155,0.387,0.681,0.396 c0.7,0.012,1.003,0.318,1.01,1.023C16.105,17.747,15.736,18.491,15.17,18.946z M19.143,17.859c0,0.06-0.008,0.116-0.058,0.145 l-1.916,1.164c-0.05,0.029-0.09,0.004-0.09-0.056v-0.494c0-0.06,0.037-0.093,0.087-0.122l1.887-1.129 c0.05-0.029,0.09-0.004,0.09,0.056V17.859z M20.459,6.797l-7.168,4.427c-0.894,0.523-1.553,1.109-1.553,2.187v8.833 c0,0.645,0.26,1.063,0.66,1.184c-0.131,0.023-0.264,0.039-0.398,0.039c-0.42,0-0.833-0.114-1.197-0.33L3.226,18.64 c-0.741-0.44-1.201-1.261-1.201-2.142V7.503c0-0.881,0.46-1.702,1.201-2.142l7.577-4.498c0.363-0.216,0.777-0.33,1.197-0.33 c0.419,0,0.833,0.114,1.197,0.33l7.577,4.498c0.624,0.371,1.046,1.013,1.164,1.732C21.686,6.557,21.12,6.411,20.459,6.797z', color: '#4EAA25' },
  'kali linux': { path: 'M12.778 5.943s-1.97-.13-5.327.92c-3.42 1.07-5.36 2.587-5.36 2.587s5.098-2.847 10.852-3.008zm7.351 3.095l.257-.017s-1.468-1.78-4.278-2.648c1.58.642 2.954 1.493 4.021 2.665zm.42.74c.039-.068.166.217.263.337.004.024.01.039-.045.027-.005-.025-.013-.032-.013-.032s-.135-.08-.177-.137c-.041-.057-.049-.157-.028-.195zm3.448 8.479s.312-3.578-5.31-4.403a18.277 18.277 0 0 0-2.524-.187c-4.506.06-4.67-5.197-1.275-5.462 1.407-.116 3.087.643 4.73 1.408-.007.204.002.385.136.552.134.168.648.35.813.445.164.094.691.43 1.014.85.07-.131.654-.512.654-.512s-.14.003-.465-.119c-.326-.122-.713-.49-.722-.511-.01-.022-.015-.055.06-.07.059-.049-.072-.207-.13-.265-.058-.058-.445-.716-.454-.73-.009-.016-.012-.031-.04-.05-.085-.027-.46.04-.46.04s-.575-.283-.774-.893c.003.107-.099.224 0 .469-.3-.127-.558-.344-.762-.88-.12.305 0 .499 0 .499s-.707-.198-.82-.85c-.124.293 0 .469 0 .469s-1.153-.602-3.069-.61c-1.283-.118-1.55-2.374-1.43-2.754 0 0-1.85-.975-5.493-1.406-3.642-.43-6.628-.065-6.628-.065s6.45-.31 11.617 1.783c.176.785.704 2.094.989 2.723-.815.563-1.733 1.092-1.876 2.97-.143 1.878 1.472 3.53 3.474 3.58 1.9.102 3.214.116 4.806.942 1.52.84 2.766 3.4 2.89 5.703.132-1.709-.509-5.383-3.5-6.498 4.181.732 4.549 3.832 4.549 3.832zM12.68 5.663l-.15-.485s-2.484-.441-5.822-.204C3.37 5.211 0 6.38 0 6.38s6.896-1.735 12.68-.717Z', color: '#557C94' },
  'fedora': { path: 'M12.001 0C5.376 0 .008 5.369.004 11.992H.002v9.287h.002A2.726 2.726 0 0 0 2.73 24h9.275c6.626-.004 11.993-5.372 11.993-11.997C23.998 5.375 18.628 0 12 0zm2.431 4.94c2.015 0 3.917 1.543 3.917 3.671 0 .197.001.395-.03.619a1.002 1.002 0 0 1-1.137.893 1.002 1.002 0 0 1-.842-1.175 2.61 2.61 0 0 0 .013-.337c0-1.207-.987-1.672-1.92-1.672-.934 0-1.775.784-1.777 1.672.016 1.027 0 2.046 0 3.07l1.732-.012c1.352-.028 1.368 2.009.016 1.998l-1.748.013c-.004.826.006.677.002 1.093 0 0 .015 1.01-.016 1.776-.209 2.25-2.124 4.046-4.424 4.046-2.438 0-4.448-1.993-4.448-4.437.073-2.515 2.078-4.492 4.603-4.469l1.409-.01v1.996l-1.409.013h-.007c-1.388.04-2.577.984-2.6 2.47a2.438 2.438 0 0 0 2.452 2.439c1.356 0 2.441-.987 2.441-2.437l-.001-7.557c0-.14.005-.252.02-.407.23-1.848 1.883-3.256 3.754-3.256z', color: '#51A2DA' },
  'wireshark': { path: 'm2.95 0c-1.62 0-2.95 1.32-2.95 2.95v18.1c0 1.63 1.32 2.95 2.95 2.95h18.1c1.62 0 2.95-1.32 2.95-2.95v-18.1c-.00024-1.63-1.32-2.95-2.95-2.95zm0 1.09h18.1c1.04 0 1.85.818 1.85 1.86v14h-5.27c-.335-.796-2.57-6.47.283-10.9a.516.517 0 0 0-.443-.794c-5.24.0827-8.2 3.19-9.74 6.21-1.35 2.64-1.63 4.91-1.69 5.53h-4.95v-14c0-1.04.817-1.86 1.85-1.86zm13.6 5.24c-2.62 5.24.248 11.4.248 11.4a.516.517 0 0 0 .469.301h5.62v3.05c0 1.04-.817 1.86-1.85 1.86h-18.1c-1.04 0-1.85-.818-1.85-1.86v-3.05h5.39a.516.517 0 0 0 .514-.477s.226-2.8 1.66-5.62c1.34-2.62 3.67-5.17 7.91-5.57z', color: '#1679A7' },
  'burp suite': { path: 'M0 0v24h24V0Zm11.063 3.357h1.874v2.756L10.41 9.2h2.527v3.748h4.579l-4.578 5.592v2.104h-1.876v-2.758l2.528-3.086h-2.527V11.05h-4.58l4.58-5.592Z', color: '#FF6633' },
  'metasploit': { path: 'M11.353 0h1.368q4.19.218 8.144 1.616.217.077.216.309-.015 4.033-.002 12.102 0 .81-.093 1.173c-.217.845-.76 1.635-1.326 2.325q-.318.388-1.024 1.046-2.955 2.75-6.01 5.094-.183.14-.516.335h-.17q-.627-.42-.945-.673-3.992-3.184-5.442-4.459-1.348-1.185-2.169-2.611c-.369-.64-.466-1.287-.465-2.099q.01-6.048.002-12.218c0-.183.09-.264.261-.325Q7.145.227 11.352 0ZM7.474 7.864q0-.094.069-.031l2.797 2.516a.374.372 21.2 0 1 .122.276l-.006 4.333a.182.182 0 0 0 .183.184l2.524-.018a.11.11 89.8 0 0 .108-.11q-.007-2.201.01-4.461.002-.173.146-.29 1.397-1.145 2.946-2.393.068-.055.068.032v10.881q0 .092.063.024.794-.865 1.628-1.838.71-.83.984-1.87.26-.989.262-1.997.007-4.754.009-9.768a.136.136 0 0 0-.137-.136q-1.15.004-2.424 0c-.287-.002-.441-.022-.619.149Q14.16 5.317 11.982 7.4a.046.046 0 0 1-.062 0Q9.782 5.437 7.769 3.525c-.234-.222-.515-.381-.843-.373q-1.09.026-2.33.005-.184-.004-.184.18-.003 4.54.005 9.032.002.536.036 1.027c.076 1.093.2 2.126.803 3.021.574.852 1.329 1.656 2.126 2.405q.023.022.054.026.04.006.04-.034z', color: '#2596CD' },
  'hashcat': { path: 'M11.977 0c-.77.003-1.534.136-2.01.4C9.07.875 7.935.98 6.51.663L5.453.453l.818.765c.977.924 1.664 2.428 1.664 3.67 0 1.029 1.161 2.507 2.375 3.009.792.316.819.396.66 1.557-.791 5.887-1.504 8.422-2.771 9.873-1.083 1.268-1.32 1.875-1.32 3.326V24h10.295v-1.347c0-1.425-.237-2.032-1.267-3.273-1.293-1.557-2.217-4.752-2.64-9.16-.211-2.006-.185-2.086.396-2.218.924-.237 2.402-2.059 2.587-3.194.106-.554.238-1.346.317-1.742.053-.423.554-1.162 1.056-1.663l.924-.925-1.03.185c-1.372.29-2.587.185-3.51-.29-.49-.25-1.261-.376-2.03-.373M9.039 5.257h.004c.238 0 2.06 1.082 2.06 1.214 0 .317-.872.026-1.505-.554-.39-.338-.652-.65-.56-.66m5.976.058c.097-.003-.097.195-.56.602-.396.37-.924.66-1.161.66-.528 0-.37-.159.765-.792.557-.31.87-.468.956-.47', color: '#e6edf3' },
  'splunk': { path: 'M23.348 11.911l-2.241-1.091v-.65L24 11.621v.593l-2.893 1.438v-.636zm-5.397 1.841h-.961v-5.31h.961v3.116h.102l1.28-1.481.723.31-1.23 1.316 1.453 1.809-.888.311-1.44-1.996zm-2.577-.002v-2.068a2.685 2.685 0 0 0-.026-.42.791.791 0 0 0-.09-.26c-.113-.202-.308-.304-.59-.304a.888.888 0 0 0-.461.113.673.673 0 0 0-.286.33 1.012 1.012 0 0 0-.07.263c-.012.13-.019.262-.017.395v1.95h-.961v-3.614h.961l.002.485c.185-.2.373-.348.566-.437.192-.089.418-.134.673-.134.286 0 .527.058.721.177a1.016 1.016 0 0 1 .475.665 1.972 1.972 0 0 1 .054.448c.002.1.004.22.004.358v2.053zm-4.115.002l-.002-.485a1.783 1.783 0 0 1-.565.437 1.597 1.597 0 0 1-.674.135c-.285 0-.524-.057-.72-.17a.972.972 0 0 1-.425-.504.75.75 0 0 1-.054-.167 1.918 1.918 0 0 1-.033-.199 2.033 2.033 0 0 1-.017-.258 15.516 15.516 0 0 1-.005-.355V10.13h.956v2.07c-.003.141.006.282.026.42.015.092.045.18.09.26.113.204.308.306.59.306.36 0 .606-.15.74-.449.035-.082.06-.168.074-.257.017-.134.024-.269.022-.403v-1.95h.955v3.624zM7.184 8.44h.955v5.31h-.955zM5.759 11.9c0-.396-.08-.708-.24-.937a.759.759 0 0 0-.657-.345.804.804 0 0 0-.693.366c-.171.245-.256.574-.253.99 0 .405.084.723.25.957a.796.796 0 0 0 .69.347.685.685 0 0 0 .433-.135.985.985 0 0 0 .277-.34c.071-.14.121-.292.147-.448.03-.151.043-.3.046-.455m1.01-.036c.003.266-.04.532-.129.786-.082.23-.204.441-.364.626-.31.361-.764.567-1.24.563a1.67 1.67 0 0 1-.313-.028 1.041 1.041 0 0 1-.275-.098 1.33 1.33 0 0 1-.257-.178 2.379 2.379 0 0 1-.265-.268v2.293h-.929v-5.425h.93l.004.529c.169-.212.353-.368.55-.468.197-.1.426-.15.688-.147a1.509 1.509 0 0 1 1.156.507c.148.166.259.361.33.571.08.236.12.485.115.737m-4.21.89a.946.946 0 0 1-.102.441 1.007 1.007 0 0 1-.282.345c-.13.1-.275.173-.43.22a1.8 1.8 0 0 1-.546.08 1.985 1.985 0 0 1-.637-.097 1.964 1.964 0 0 1-.563-.32l.312-.505c.15.126.284.217.405.275.115.057.24.087.368.087a.557.557 0 0 0 .373-.12.396.396 0 0 0 .14-.322.475.475 0 0 0-.12-.318 1.306 1.306 0 0 0-.187-.173 9.231 9.231 0 0 0-.308-.232 6.787 6.787 0 0 1-.281-.21 2.11 2.11 0 0 1-.252-.232 1.039 1.039 0 0 1-.18-.275.826.826 0 0 1-.069-.347.893.893 0 0 1 .094-.409.935.935 0 0 1 .255-.314 1.22 1.22 0 0 1 .39-.203c.16-.05.327-.074.494-.072.184 0 .368.026.545.076.174.05.338.123.488.219l-.282.454a1.05 1.05 0 0 0-.608-.201.504.504 0 0 0-.323.102.307.307 0 0 0-.126.253c0 .098.041.193.113.26.074.078.203.186.385.325.185.136.336.253.457.355.104.085.202.182.286.286.065.08.115.173.145.273a.808.808 0 0 1 .046.299Z', color: '#65A637' },
};

function lookupBrandIcon(label) {
  const key = label.toLowerCase().trim();
  if (brandIcons[key]) return brandIcons[key];
  if (key.includes('html')) return brandIcons['html'];
  if (key.includes('css')) return brandIcons['css'];
  if (key.includes('python')) return brandIcons['python'];
  if (key.includes('git')) return brandIcons['git/github'];
  if (key.includes('bash')) return brandIcons['bash'];
  if (key.includes('kali')) return brandIcons['kali linux'];
  if (key.includes('fedora')) return brandIcons['fedora'];
  if (key.includes('wireshark')) return brandIcons['wireshark'];
  if (key.includes('burp')) return brandIcons['burp suite'];
  if (key.includes('metasploit')) return brandIcons['metasploit'];
  if (key.includes('hashcat')) return brandIcons['hashcat'];
  if (key.includes('splunk')) return brandIcons['splunk'];
  return undefined;
}

const skillCategories = [
  { id: 'networking', label: 'NETWORKING', note: 'Core networking fundamentals',
    skills: ['TCP/IP', 'OSI Model', 'DNS', 'HTTP/HTTPS', 'SSH', 'Ports', 'Subnetting'],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-5 w-5"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>' },
  { id: 'linux', label: 'LINUX', note: 'Daily driver environment',
    skills: ['Kali Linux', 'Fedora', 'Bash', 'Linux administration'],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-5 w-5"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>' },
  { id: 'cybersecurity', label: 'CYBERSECURITY', note: 'Security discipline in progress',
    skills: ['VAPT', 'Web Security', 'OSINT', 'Cryptography', 'Threat Intelligence', 'MITRE ATT&CK', 'SOC Fundamentals', 'SIEM'],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-5 w-5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>' },
  { id: 'tools', label: 'TOOLS', note: 'Practical security tooling & SIEM tools',
    skills: ['Nmap', 'Burp Suite', 'Wireshark', 'Metasploit', 'Hydra', 'John the Ripper', 'Hashcat', 'Aircrack-ng', 'Wazuh', 'Splunk'],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-5 w-5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>' },
  { id: 'programming', label: 'PROGRAMMING', note: 'Language & development basics',
    skills: ['Python', 'HTML', 'CSS', 'Git/GitHub'],
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide h-5 w-5"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>' },
];

const skillsPanel = document.getElementById('skills-panel');
const tabButtons = document.querySelectorAll('[data-skill-tab]');

function renderSkillsPanel(catId) {
  const cat = skillCategories.find((c) => c.id === catId);
  const idx = skillCategories.findIndex((c) => c.id === catId) + 1;
  const tagsHtml = cat.skills
    .map((s, i) => {
      const icon = lookupBrandIcon(s);
      const badge = icon
        ? `<svg viewBox="0 0 24 24" class="h-3.5 w-3.5 shrink-0" fill="${icon.color}" aria-hidden="true"><path d="${icon.path}"/></svg>`
        : `<span class="text-cyber-green/50">${String(i + 1).padStart(2, '0')}</span>`;
      return `<span class="inline-flex items-center gap-2 rounded border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-cyber-green/40 hover:text-ink">${badge}${s}</span>`;
    })
    .join('');
  skillsPanel.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-cyber-green">${cat.icon}</span>
        <h3 class="font-mono text-lg font-bold uppercase tracking-wider text-ink">${cat.label}</h3>
      </div>
      <span class="font-mono text-xs text-cyber-green/60">${String(idx).padStart(2, '0')}/05</span>
    </div>
    <p class="mt-2 text-sm text-ink-faint">${cat.note}</p>
    <div class="mt-6 flex cursor-cell flex-wrap gap-2">${tagsHtml}</div>
  `;
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-skill-tab');
    tabButtons.forEach((b) => {
      const active = b === btn;
      b.setAttribute('aria-pressed', String(active));
      b.classList.toggle('border-cyber-green/50', active);
      b.classList.toggle('bg-cyber-green/5', active);
      b.classList.toggle('text-cyber-green', active);
      b.classList.toggle('border-line', !active);
      b.classList.toggle('text-ink-muted', !active);
      const iconSpan = b.querySelector('span');
      if (iconSpan) {
        iconSpan.classList.toggle('text-cyber-green', active);
        iconSpan.classList.toggle('text-ink-faint', !active);
      }
    });
    renderSkillsPanel(id);
  });
});

// ---- Journey timeline scroll reveal ----
const revealItems = document.querySelectorAll('.reveal-item');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-4');
        entry.target.classList.add('opacity-100', 'translate-y-0');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealItems.forEach((el) => revealObserver.observe(el));

// ---- Interactive terminal ----
const helpLines = [
  'Available commands:',
  '  help      - show this help',
  '  whoami    - who is m0xsecX',
  '  focus     - current focus',
  '  skills    - list core skills',
  '  projects  - list projects',
  '  mission   - the mission statement',
  '  status    - system status',
  '  clear     - clear the terminal',
];
const termCommands = {
  help: helpLines,
  whoami: ['Manoj S / m0xsecX', '', 'Cybersecurity enthusiast', 'Ethical hacking learner', 'Developer', 'CTF learner'],
  focus: ['CYBERSECURITY'],
  skills: ['Python', 'Linux', 'Networking', 'Web Security', 'OSINT', 'VAPT'],
  projects: ['[01] PersonaShield', '[02] CyberAI Terminal', '[03] VulnEye'],
  mission: ['Learn. Build. Break. Secure.'],
  status: ['SYSTEM: ONLINE', 'MODE: LEARNING', 'BUILD: 2026'],
};
const termOutput = document.getElementById('term-output');
const termForm = document.getElementById('term-form');
const termInput = document.getElementById('term-input');
const termEnd = document.createElement('div');
termOutput.appendChild(termEnd);

function addLine(text, type) {
  const div = document.createElement('div');
  div.className =
    'whitespace-pre-wrap ' +
    (type === 'input' ? 'text-cyber-green' : type === 'error' ? 'text-red-400' : 'text-cyan-300');
  div.textContent = text;
  termOutput.insertBefore(div, termEnd);
  termEnd.scrollIntoView({ behavior: 'smooth' });
}

function runCommand(cmd) {
  const trimmed = cmd.trim().toLowerCase();
  addLine('$ ' + cmd, 'input');
  if (trimmed === 'clear') {
    Array.from(termOutput.querySelectorAll('div')).forEach((d) => {
      if (d !== termEnd) d.remove();
    });
    return;
  }
  if (trimmed === '') return;
  if (termCommands[trimmed]) {
    termCommands[trimmed].forEach((line) => addLine(line, 'output'));
  } else {
    addLine("command not found. Type 'help' for available commands.", 'error');
  }
}

termOutput.addEventListener('click', () => termInput.focus());
termForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = termInput.value;
  termInput.value = '';
  runCommand(val);
});

// ---- Hero photo lightbox ----
const heroPhoto = document.getElementById('hero-photo');
if (heroPhoto) {
  const overlay = document.createElement('div');
  overlay.style.cssText =
    'display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.85);align-items:center;justify-content:center;cursor:zoom-out;padding:2rem;';
  const bigImg = document.createElement('img');
  bigImg.src = heroPhoto.src;
  bigImg.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;border:2px solid rgba(57,255,20,0.5);';
  overlay.appendChild(bigImg);
  document.body.appendChild(overlay);
  heroPhoto.addEventListener('click', () => {
    overlay.style.display = 'flex';
  });
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}

// ---- Smooth scroll for in-page anchors ----
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Contact form submission (Flask /api/contact) ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const submitBtn = document.getElementById('cf-submit');
  const statusEl = document.getElementById('cf-status');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // honeypot check: if filled, silently pretend success (bot caught)
    const honeypot = contactForm.querySelector('#cf-company').value;
    const payload = {
      name: contactForm.querySelector('#cf-name').value.trim(),
      email: contactForm.querySelector('#cf-email').value.trim(),
      subject: contactForm.querySelector('#cf-subject').value.trim(),
      message: contactForm.querySelector('#cf-message').value.trim(),
      company: honeypot,
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      statusEl.textContent = 'Please fill in all fields.';
      statusEl.className = 'font-sans text-sm text-red-400';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    statusEl.textContent = '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        statusEl.textContent = 'Message sent — thanks! I\'ll get back to you soon.';
        statusEl.className = 'font-sans text-sm text-cyber-green';
        contactForm.reset();
      } else {
        statusEl.textContent = data.error || 'Something went wrong. Please try again.';
        statusEl.className = 'font-sans text-sm text-red-400';
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please try again in a moment.';
      statusEl.className = 'font-sans text-sm text-red-400';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });
}
