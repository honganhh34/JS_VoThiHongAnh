function fetchData(query = '') {
  fetch(`fetch_data.php?q=${query}`)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('tableBody');
      tbody.innerHTML = '';
      data.forEach(row => {
        tbody.innerHTML += `
          <tr>
            <td><input type="checkbox" value="${row.id}"></td>
            <td>PT-${String(row.id).padStart(3, '0')}</td>
            <td>${row.tenant_name}</td>
            <td>${row.phone_number}</td>
            <td>${row.start_date}</td>
            <td>${row.payment}</td>
            <td>${row.note}</td>
          </tr>`;
      });
    })
    .catch(error => console.error('Lỗi khi fetch dữ liệu:', error));
}

  
  function showCreateForm() {
    document.getElementById('createForm').classList.remove('hidden');
  }
  function closeForm() {
    document.getElementById('createForm').classList.add('hidden');
  }
  
  function submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.tenant_name.value.trim();
    const phone = form.phone_number.value.trim();
    const date = form.start_date.value;
    const nameValid = /^[A-Za-z\s]{5,50}$/.test(name);
    const phoneValid = /^\d{10}$/.test(phone);
    const today = new Date().toISOString().split('T')[0];
    if (!nameValid || !phoneValid || date < today) {
      alert('Dữ liệu không hợp lệ!');
      return;
    }
    fetch('create_rent.php', {
      method: 'POST',
      body: new FormData(form)
    }).then(() => {
      closeForm();
      fetchData();
    });
  }
  
  function toggleAll(el) {
    document.querySelectorAll('#tableBody input[type=checkbox]').forEach(cb => cb.checked = el.checked);
  }
  
  function confirmDelete() {
    const selected = [...document.querySelectorAll('#tableBody input[type=checkbox]:checked')].map(cb => cb.value);
    if (!selected.length) return;
    document.getElementById('popupText').innerText = `Bạn có muốn xóa thông tin thuê trọ ${selected.map(id => 'PT-' + String(id).padStart(3, '0')).join(', ')} không?`;
    document.getElementById('popup').classList.remove('hidden');
  }
  function closePopup() {
    document.getElementById('popup').classList.add('hidden');
  }
  
  function deleteSelected() {
    const ids = [...document.querySelectorAll('#tableBody input[type=checkbox]:checked')].map(cb => cb.value);
  
    console.log('IDS gửi lên:', ids); // debug log
    
    fetch('delete_rent.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    })
    .then(res => res.json())
    .then(res => {
      console.log('Kết quả từ server:', res); // debug log
      if (res.success) {
        closePopup();
        fetchData();
      } else {
        alert(res.error || 'Xóa thất bại!');
      }
    })
    .catch(err => {
      console.error('Lỗi fetch:', err);
      alert('Lỗi kết nối server!');
    });
  }
  
  
  
  function searchData() {
    const q = document.getElementById('searchInput').value;
    fetchData(q);
  }
  
  fetchData();