// tab
function openTab(tabName) {
  document.querySelectorAll('.tab, .tabs').forEach(function (el) {
    el.classList.remove('on');
  });
  document.getElementById(tabName).classList.add('on');
  document.querySelector('.tabs[onclick="openTab(\'' + tabName + '\')"]').classList.add('on');
}

//  counter
if ($('.single-counter').length) { // 1번: .single-counter가 페이지에 있는지 확인
    $('.counter').counterUp({      // 2번: .counter 클래스를 가진 요소들에 기능 부여
      delay: 10,
      time: 1000
    });

}

//scroll_top_btn
$('.scroll_top').hide();
$(window).scroll(function(){
    var height = $(window).scrollTop();
    if(height >200){
        $('.scroll_top').fadeIn(0)
    }
    else{
        $('.scroll_top').fadeOut(0);
    }
});
$('.scroll_top').click(function(){
    $(window).scrollTop(0) ;
});

// visual
const canvas = document.getElementById("visual-canvas");
const ctx = canvas.getContext("2d");

let mouseMoved = false;

const pointer = {
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight
};

const params = {
    pointsNumber: 40,
    widthFactor: 10,
    mouseThreshold: 0.5,
    spring: 0.25,
    friction: 0.5
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0
    };
}

// 마우스 움직임 감지
window.addEventListener("click", (e) => {
    updateMousePosition(e.clientX, e.clientY);
});
window.addEventListener("mousemove", (e) => {
    mouseMoved = true;
    updateMousePosition(e.clientX, e.clientY);
});

// visual 좌표
function updateMousePosition(eX, eY) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = eX - rect.left;
    pointer.y = eY - rect.top;
}

// 캔버스 크기 설정 함수
function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 애니메이션 루프
function update(t) {
    // 마우스가 안 움직일 때 스스로 떠다니는 효과
    if (!mouseMoved) {
        pointer.x = (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * window.innerWidth;
        pointer.y = (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.sin(0.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 선의 경로 계산
    trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
    });

    // 컬러 변경
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "rgba(255, 126, 95, 0.7)"); // 시작 색상
    gradient.addColorStop(1, "rgba(254, 180, 123, 0.6)"); // 끝 색상

    ctx.strokeStyle = gradient;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    // 곡선
    for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.stroke();
    }

    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();

    window.requestAnimationFrame(update);
}

// 실행
setupCanvas();
update(0);
window.addEventListener("resize", setupCanvas);

