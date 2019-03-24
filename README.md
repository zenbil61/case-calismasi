<h3>#PROJEYİ ÇALIŞTIRMA</h3>
Komut satırı ile proje içerisindeyken npm install dedikten sonra gulp watch diyerek projeyi ayağa kaldırabilirsiniz

<h3>#KULLANILAN TEKNOLOJILER</h3>
Html,<br/>
Sass,<br/>
Javascript,<br/>
Gulp,<br/>

<h3>#GULP</h3>
<b>Plugin["browser-sync"]</b><br/>
 *Geliştirme yaparken değişikliklerimin anlık ekrana yansıması için kullanıldı<br/>
<b>Plugin["gulp-sass"]</b><br/>
 *Geliştirme yaparken scss dosyalarımın anlık compile edilmesi için kullanıldı


<h3>#ANALİZ</h3>

<b>Arama</b><br/>
*Ürünün Adı(DisplayName) ve Açıklaması(Description) Alanlarına göre arama yapar<br/>

<b>Sepete Ekleme</b><br/>
*Yazılan Adet Kadar Sepete Ekler<br/>
*Eğer aynı üründen 2 farklı işlem yapılarak AYNI ürün eklenirse 2 farklı satır oluşturmak yerine adetleri toplanır<br/>

<b>Sepette Güncelleme</b><br/>
*Eğer Adet düşürme işlemi yapılıyorsa en düşük adet olarak 1'e kadar inebiliyor.<br/>
