let currentMode = 'decode'; // 'decode' ou 'encode'

document.addEventListener('DOMContentLoaded', function() {
    const inputData = document.getElementById('input-data');
    const outputData = document.getElementById('output-data');
    const convertBtn = document.getElementById('convert-btn');
    const clearBtn = document.getElementById('clear-btn');
    const toTextBtn = document.getElementById('to-text-btn');
    const toBinaryBtn = document.getElementById('to-binary-btn');

    // Alternar entre modos
    toTextBtn.addEventListener('click', function() {
        currentMode = 'decode';
        this.classList.add('active');
        this.classList.remove('btn-outline');
        toBinaryBtn.classList.remove('active');
        toBinaryBtn.classList.add('btn-outline');
        updateLabels();
    });

    toBinaryBtn.addEventListener('click', function() {
        currentMode = 'encode';
        this.classList.add('active');
        this.classList.remove('btn-outline');
        toTextBtn.classList.remove('active');
        toTextBtn.classList.add('btn-outline');
        updateLabels();
    });

    function updateLabels() {
        const inputLabel = document.querySelector('.input-group label');
        const outputLabel = document.querySelectorAll('.input-group label')[1];
        
        if (currentMode === 'decode') {
            inputLabel.innerHTML = '<i class="fas fa-keyboard"></i> Binário:';
            outputLabel.innerHTML = '<i class="fas fa-font"></i> Texto:';
            inputData.placeholder = 'Digite código binário (ex: 01001000 01101111)';
            outputData.placeholder = 'Texto decodificado aparecerá aqui';
        } else {
            inputLabel.innerHTML = '<i class="fas fa-font"></i> Texto:';
            outputLabel.innerHTML = '<i class="fas fa-keyboard"></i> Binário:';
            inputData.placeholder = 'Digite o texto a ser codificado';
            outputData.placeholder = 'Código binário aparecerá aqui';
        }
    }

    // Converter dados
    convertBtn.addEventListener('click', async function() {
        const input = inputData.value.trim();
        if (!input) {
            outputData.value = "Por favor, insira algum conteúdo";
            return;
        }

        try {
            let result;
            if (currentMode === 'decode') {
                result = await binaryToText(input);
            } else {
                result = await textToBinary(input);
            }
            
            outputData.value = result;
            
            // Efeito visual de sucesso
            this.innerHTML = '<i class="fas fa-check"></i> Convertido!';
            this.classList.add('btn-success');
            this.classList.remove('btn-primary');
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-cogs"></i> Converter';
                this.classList.add('btn-primary');
                this.classList.remove('btn-success');
            }, 2000);
            
        } catch (error) {
            outputData.value = "Erro: " + error.message;
        }
    });

    // Limpar campos
    clearBtn.addEventListener('click', function() {
        inputData.value = '';
        outputData.value = '';
        inputData.focus();
    });

    // Funções de conversão
    async function binaryToText(binary) {
        const response = await fetch('https://bin2text-elj0.onrender.com/api/decode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ binary })
        });
        
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.text;
    }

    async function textToBinary(text) {
        const response = await fetch('https://bin2text-elj0.onrender.com/api/encode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.binary;
    }

    // Inicialização
    updateLabels();
});