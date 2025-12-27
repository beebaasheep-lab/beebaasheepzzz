document.addEventListener('DOMContentLoaded', function() {
    
    const charactersData = JSON.parse(document.getElementById('characters-data').textContent);
    
    // 世界觀篩選
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const series = this.getAttribute('data-series');
            const cards = document.querySelectorAll('.character-card');
            
            cards.forEach(card => {
                if (series === 'all' || card.getAttribute('data-series') === series) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 點擊角色卡片打開彈出視窗
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const character = charactersData.find(c => c.id === id);
            openModal(character);
        });
    });
    
    // 打開彈出視窗
    function openModal(character) {
        const modal = document.getElementById('characterModal');
        const baseurl = document.getElementById('characters-data').getAttribute('data-baseurl');
        
        const modalImage = document.getElementById('modalImage');
        if (character.image) {
            modalImage.innerHTML = '<img src="' + baseurl + '/assets/images/characters/' + character.image + '" alt="' + character.name + '">';
        } else {
            modalImage.innerHTML = '<div class="placeholder-silhouette-large"><img src="' + baseurl + '/assets/images/characters/placeholder.png" alt="角色佔位圖"></div>';
        }
        
        document.getElementById('modalId').textContent = character.id;
        document.getElementById('modalName').textContent = character.name;
        document.getElementById('modalNameEn').textContent = character.name_en;
        document.getElementById('modalTagline').textContent = '「' + character.tagline + '」';
        document.getElementById('modalSeries').textContent = character.series;
        
        const eraElement = document.getElementById('modalEra');
        if (character.reference_era) {
            eraElement.innerHTML = '<strong>參考史實:</strong> ' + character.reference_era;
            eraElement.style.display = 'block';
        } else {
            eraElement.style.display = 'none';
        }
        
        modal.style.display = 'block';
    }
    
    // 關閉彈出視窗
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('characterModal').style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('characterModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});