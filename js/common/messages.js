export default function message(type, message, target) {
  const targetMessage = document.querySelector(target);
  targetMessage.innerHTML = `<div class="message ${type}">${message}</div>`;
}
