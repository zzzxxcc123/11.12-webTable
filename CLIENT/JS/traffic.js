// 관련 데이터 불어오기
async function traFfic(){
    const response = await fetch('https://apis.data.go.kr/1613000/KICTopenAPI/spothcv?serviceKey=K0IqZL5i0pZBj2v7hetntxJaPqF6rCErIJ2%2FdEQHFOljrkMG5NLM5AZZhRNsGJA2uuwrBkNBvrvgwIqeIxxNRA%3D%3D&year=2020&dtype=1&output=json&pageNo=100&numOfRows=100')
    const data1 = await response.json()
    return data1.traffic
}

async function inforMation() {
    const response = await fetch('https://apis.data.go.kr/1613000/KICTopenAPI/spotlist?serviceKey=K0IqZL5i0pZBj2v7hetntxJaPqF6rCErIJ2%2FdEQHFOljrkMG5NLM5AZZhRNsGJA2uuwrBkNBvrvgwIqeIxxNRA%3D%3D&year=2020&dtype=1&PageNo=10&numOfRows=700&output=json');
    const data2 = await response.json();
    return data2.spot;
}

// 데이터 처리 
//도시 리스트 및 측정 위치 id 
let city_list = {};
function city_info_list(data) {
    let city_map = new Map();

    for (let i of data) {
        if (!city_map.has(i.locate)) {
            city_map.set(i.locate, []);
        }
        city_map.get(i.locate).push(i.spot);
    }

    city_map.forEach((spots, city) => {
        city_list[city] = spots;
    });
    return city_list;
}

// id 보여주기
function showId(city, realList){
    let oneCity = city
    let ids = realList[city]

    let result = document.getElementById('result')
    result.innerHTML = ''
    for(let i of ids){
        let result_arr = document.createElement('button')
        result_arr.textContent = `${i}`
        result.appendChild(result_arr)
        result_arr.addEventListener('click', function(){
            showData(i)
            mapChange(i)
        })
    }
}

// id의 자세한 데이터를 출력하기 
function showData(id){
    traFfic()
        .then((data) => {
            let id_data = data.filter((value) => value.spot_id === id)

            if(id_data.length > 0){
                const id_data2 = document.getElementById('table');
                id_data2.innerHTML = '';
                
                let headerRow = document.createElement('tr');
                headerRow.innerHTML = '<th>차량 종류</th><th>교통량</th>';
                id_data2.appendChild(headerRow);

                let vehicle_type1 = '총 교통량';
                let row = document.createElement('tr');
                row.innerHTML = `<td>${vehicle_type1}</td><td>${id_data[0].total_count}</td>`;
                id_data2.appendChild(row);


                let row2 = document.createElement('tr');
                row2.innerHTML = `<td>16인승 미만의 여객 수송용 차량, 미니 트럭 등 </td><td>${id_data[0]['vehicle_type1']}</td>`;
                id_data2.appendChild(row2);

                let row3 = document.createElement('tr');
                row3.innerHTML = `<td>16인승 이상의 여객 수송용 버스</td><td>${id_data[0]['vehicle_type2']}</td>`;
                id_data2.appendChild(row3);

                let row4 = document.createElement('tr');
                row4.innerHTML = `<td>화물 수송용 트럭으로 2축의 최대 적재량 1~2.5톤 미만의 1단위 차량</td><td>${id_data[0]['vehicle_type3']}</td>`;
                id_data2.appendChild(row4);

                let row5 = document.createElement('tr');
                row5.innerHTML = `<td>화물 수송용 트럭으로 2축의 최대적재량 2.5톤이상의 1단위 차량</td><td>${id_data[0]['vehicle_type4']}</td>`;
                id_data2.appendChild(row5);

                let row6 = document.createElement('tr');
                row6.innerHTML = `<td>화물 수송용 트럭으로 3축 1단위 차량</td><td>${id_data[0]['vehicle_type5']}</td>`;
                id_data2.appendChild(row6);

                let row7 = document.createElement('tr');
                row7.innerHTML = `<td>화물 수송용 트럭 형식으로 4축 1단위 차량</td><td>${id_data[0]['vehicle_type6']}</td>`;
                id_data2.appendChild(row7);

                let row8 = document.createElement('tr');
                row8.innerHTML = `<td>화물 수송용 트럭 형식으로 5축 1단위 차량</td><td>${id_data[0]['vehicle_type7']}</td>`;
                id_data2.appendChild(row8);

                let row9 = document.createElement('tr');
                row9.innerHTML = `<td>화물 수송용 세미 트레일러 형식으로 4축 2단위(견인차, 피견인차) 차량</td><td>${id_data[0]['vehicle_type8']}</td>`;
                id_data2.appendChild(row9);

                let row10 = document.createElement('tr');
                row10.innerHTML = `<td>화물 수송용 풀 트레일러 형식으로 4축 2단위(견인차, 피견인차) 차량</td><td>${id_data[0]['vehicle_type9']}</td>`;
                id_data2.appendChild(row10);

                let row11 = document.createElement('tr');
                row11.innerHTML = `<td>화물 수송용 세미 트레일러 형식으로 5축 2단위(견인차, 피견인차) 차량</td><td>${id_data[0]['vehicle_type10']}</td>`;
                id_data2.appendChild(row11);

                let row12 = document.createElement('tr');
                row12.innerHTML = `<td>화물 수송용 풀 트레일러 형식으로 5축 2단위(견인차, 피견인차) 차량</td><td>${id_data[0]['vehicle_type11']}</td>`;
                id_data2.appendChild(row12);

                
                let row13 = document.createElement('tr');
                row13.innerHTML = `<td>화물 수송용 세미 트레일러 형식으로 6축이상 2단위(견인차, 피견인차) 차량</td><td>${id_data[0]['vehicle_type12']}</td>`;
                id_data2.appendChild(row13);
                }
            }
        )
}

// 지도 변경 
function mapChange(id){
    inforMation()
        .then((data) => {
            let indexData = data.filter((value) => value.spot === id)
            console.log(indexData)
            let x = indexData[0].xcode
            let y = indexData[0].ycode
            let name = `${indexData[0].stname} -> ${indexData[0].endname}` 

                // 이동할 위도 경도 위치를 생성합니다 
            var newMoveLatLon = new kakao.maps.LatLng(x, y);
            
            // 지도 중심을 이동 시킵니다
            map.setCenter(newMoveLatLon);

                        // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: newMoveLatLon
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);


            var newIwContent = `<div style="padding:5px;">${name}</div>`;
            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content : newIwContent
            });

            // 마커에 마우스오버 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'mouseover', function() {
            // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                infowindow.open(map, marker);
            });

            // 마커에 마우스아웃 이벤트를 등록합니다
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                infowindow.close();
            });
        })
}


traFfic()
    .then((data) => {
        let traffic_list = {}
        for(let i of data){
            traffic_list[i.spot_id] = [
                i.total_count, 
                i.vehicle_type1, 
                i.vehicle_type2,
                i.vehicle_type3,
                i.vehicle_type4,
                i.vehicle_type5,
                i.vehicle_type6,
                i.vehicle_type7,
                i.vehicle_type8,
                i.vehicle_type9,
                i.vehicle_type10,
                i.vehicle_type11,
                i.vehicle_type12
            ]
        }
    inforMation()
        .then((data) => {
            const city_list = city_info_list(data)

            var butList= document.getElementById('butList')

            let realList = {}
            for(let city of Object.keys(city_list)){
                let idList = city_list[city]
                let id = idList.filter(value => traffic_list[value] !== undefined);
                realList[city] = id
            }

            // 버튼 및 리스트 생성 , 버튼 클릭 이벤트 추가
            for(let city of  Object.keys(realList)){
                let button = document.createElement('button')
                button.textContent = city
                button.addEventListener('click', function(){
                    showId(city, realList)
                })
                butList.appendChild(button)
            }
        })
})



// kakao map
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 
var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null); 

// 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
var iwContent = '<div style="padding:5px;">Hello World!</div>'; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

// 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    content : iwContent
});

// 마커에 마우스오버 이벤트를 등록합니다
kakao.maps.event.addListener(marker, 'mouseover', function() {
  // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);
});

// 마커에 마우스아웃 이벤트를 등록합니다
kakao.maps.event.addListener(marker, 'mouseout', function() {
    // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    infowindow.close();
});
