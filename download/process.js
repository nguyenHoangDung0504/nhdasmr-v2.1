// const students = [
//     { maSV: 'abc', tenSV: 'Nguyen Van A' },
//     { maSV: 'def', tenSV: 'Tran Thi B' },
//     { maSV: 'ghi', tenSV: 'Pham Van C' },
//     // ...
// ];

// const student = students.find((item) => item.maSV === 'abc');

// if (student) {
//     console.log(student);
// } else {
//     console.log('Không tìm thấy sinh viên có mã "abc"');
// }

function extractNumberFromLink(link) {
    // Tách phần số từ đường link
    let startIndex = link.lastIndexOf('/') + 1;
    let endIndex = link.lastIndexOf('.');
    endIndex = (endIndex > startIndex) ? endIndex : (link.lastIndexOf('?v'));
    let number = link.substring(startIndex, endIndex);
    return number;
}
function downloadZip() {
    var zip = new JSZip();
    const filename = 'download.zip';
    var folder = zip.folder(filename);

    let imageLinks = [
        'https://cdn.glitch.global/36049008-0c55-496e-873e-a2f971037d73/103086-0.jpg?v=1698745286699',
        'https://cdn.glitch.global/36049008-0c55-496e-873e-a2f971037d73/103086-1.jpg?v=1698745288972',
        'https://cdn.glitch.global/36049008-0c55-496e-873e-a2f971037d73/103086-2.jpg?v=1698745290941'
    ];

    let audioLinks = [
        'https://cdn.glitch.me/36049008-0c55-496e-873e-a2f971037d73/103086track1.mp3?v=1698745306516',
        'https://cdn.glitch.global/36049008-0c55-496e-873e-a2f971037d73/103086freetalk.mp3?v=1698745292998'
    ];

    const numberOfImages = imageLinks.length;
    const numberOfAudios = audioLinks.length;

    // Hiển thị thông báo cho người dùng
    const statusElement = document.getElementById('status');
    statusElement.innerText = 'Files are being compressed for download. This will take a while.<br>(Các file đang được nén lại để tải xuống. Việc này sẽ mất một lúc.)';

    Promise.all(
        imageLinks.map(function(link) {
            return fetch(link).then(function(res) {
                return res.blob();
            });
        })
    )
    .then(function(imageBlobs) {
        imageBlobs.forEach(function(blob, index) {
            const imageNumber = extractNumberFromLink(imageLinks[index]);
            zip.file(`${imageNumber}.jpg`, blob, { binary: true });
        });

        Promise.all(
            audioLinks.map(function(link) {
                return fetch(link).then(function(res) {
                    return res.blob();
                });
            })
        )
        .then(function(audioBlobs) {
            audioBlobs.forEach(function(blob, index) {
                const audioNumber = extractNumberFromLink(audioLinks[index]);
                zip.file(`${audioNumber}.mp3`, blob, { binary: true });
            });

            // Tạo và tải xuống file ZIP
            zip.generateAsync({ type: 'blob' })
                .then(function(content) {
                    saveAs(content, filename);
                    statusElement.innerText = 'Done!';
                });
        });
    });
}