let pipelineCart = [];

const cartCountElement = document.getElementById('cart-count');
const footerTotalElement = document.getElementById('footer-total-price');
const openModalBtn = document.getElementById('open-modal-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const summaryItemsList = document.getElementById('summary-items-list');
const modalTotalDisplay = document.getElementById('modal-total-display');

// Matrix Add Loops
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const artifact = {
            id: btn.getAttribute('data-id'),
            name: btn.getAttribute('data-name'),
            price: parseFloat(btn.getAttribute('data-price'))
        };
        pipelineCart.push(artifact);
        renderCartState();
    });
});

function renderCartState() {
    cartCountElement.innerText = pipelineCart.length;
    const totalAmount = pipelineCart.reduce((sum, item) => sum + item.price, 0);
    footerTotalElement.innerText = `${totalAmount} DH`;
    
    if(pipelineCart.length > 0) {
        openModalBtn.removeAttribute('disabled');
    } else {
        openModalBtn.setAttribute('disabled', 'true');
    }
}

// Open UI Gateway
openModalBtn.addEventListener('click', () => {
    summaryItemsList.innerHTML = '';
    pipelineCart.forEach(item => {
        const li = document.createElement('li');
        li.innerText = `[-] ${item.name} — ${item.price} DH`;
        summaryItemsList.appendChild(li);
    });
    
    const totalAmount = pipelineCart.reduce((sum, item) => sum + item.price, 0);
    modalTotalDisplay.innerText = `${totalAmount} DH`;
    checkoutModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => checkoutModal.style.display = 'none');

// WhatsApp Execution Pipeline String Matrix
document.getElementById('wa-checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('client-name').value;
    const phone = document.getElementById('client-phone').value;
    const address = document.getElementById('client-address').value;
    const finalTotal = pipelineCart.reduce((sum, item) => sum + item.price, 0);
    
    let streamManifest = "";
    pipelineCart.forEach((item, index) => {
        streamManifest += `${index + 1}) ${item.name} [${item.price} DH]\n`;
    });

    const payloadText = 
`⚡ *NEW DISPATCH ORDER — PREMIUM ENGINE* ⚡
----------------------------------------
👤 *Client:* ${name}
📞 *Phone:* ${phone}
📍 *Address:* ${address}
----------------------------------------
📦 *Manifest Stack:*
${streamManifest}
----------------------------------------
💰 *TOTAL COD DUE:* ${finalTotal} DH
----------------------------------------
_System routing verified. Awaiting logistics dispatch handshake._`;

    const myWhatsAppNumber = "212622871397"; // <-- Diri num dyalk hna nishan direct b had l-format!
    const targetEndpoint = `https://api.whatsapp.com/send?phone=${myWhatsAppNumber}&text=${encodeURIComponent(payloadText)}`;
    
    window.open(targetEndpoint, '_blank');
    
    // Soft Flush Cache
    pipelineCart = [];
    renderCartState();
    checkoutModal.style.display = 'none';
});