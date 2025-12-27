// character-gallery.js

// 等待 DOM 載入完成
document.addEventListener('DOMContentLoaded', function() {
    
    // 從頁面取得角色資料 (從 HTML 的 data attribute)
    const charactersData = JSON.parse(document.getElementById('characters-data').textContent);
    
    // 陣營篩選
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const faction = this.getAttribute('data-faction');
            const cards = document.querySelectorAll('.character-card');
            
            cards.forEach(card => {
                if (faction === 'all' || card.getAttribute('data-faction') === faction) {
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
            modalImage.innerHTML = '<div class="placeholder-silhouette-large"><img src="' + baseurl + '/assets/images/characters/placeholder.png" alt="角色佔位圖" style="width: 60%; height: auto;"></div>';
        }
        
        document.getElementById('modalId').textContent = character.id;
        document.getElementById('modalName').textContent = character.name;
        document.getElementById('modalTagline').textContent = '「' + character.tagline + '」';
        document.getElementById('modalFaction').textContent = character.faction;
        
        const eraElement = document.getElementById('modalEra');
        if (character.reference_era) {
            eraElement.innerHTML = '<strong>參考史實:</strong> ' + character.reference_era;
            eraElement.style.display = 'block';
        } else {
            eraElement.style.display = 'none';
        }
        
        const tagsElement = document.getElementById('modalTags');
        if (character.tags && character.tags.length > 0) {
            tagsElement.innerHTML = character.tags.map(tag => '<span class="tag">#' + tag + '</span>').join('');
        } else {
            tagsElement.innerHTML = '';
        }
        
        const relatedImagesElement = document.getElementById('modalRelatedImages');
        if (character.related_images && character.related_images.length > 0) {
            relatedImagesElement.innerHTML = character.related_images.map(img => '<img src="' + baseurl + '/assets/images/' + img + '" alt="相關創作">').join('');
        } else {
            relatedImagesElement.innerHTML = '<p style="color: #999;">尚未新增相關創作</p>';
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