<template>
  <div>지도 {{ moveLat }} / {{ moveLng }}</div>

  <div id="map" style="width: 500px; height: 500px; border-radius: 50%; overflow: hidden;"></div>

  {{ latitude }}{{ longitude }}
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const latitude = ref(0);
const longitude = ref(0);

const moveLat = ref(0);
const moveLng = ref(0);

onMounted(() => {
  if (!("geolocation" in navigator)) {
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log(pos.coords.latitude, pos.coords.longitude);

      latitude.value = pos.coords.latitude;
      longitude.value = pos.coords.longitude;

      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        const script = document.createElement("script");
        /* global kakao */
        script.onload = () => kakao.maps.load(initMap);
        script.src =
          "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0872bac0315a50d95d3641745950227e";
        document.head.appendChild(script);
      }
    },
    (err) => {
      alert(err.message);
    }
  );
});

const initMap = () => {
  const container = document.getElementById("map");
  let options = {
    center: new kakao.maps.LatLng(latitude.value, longitude.value),
    level: 3,
  };

  let map = new kakao.maps.Map(container, options);

  var markerPosition = new kakao.maps.LatLng(latitude.value, longitude.value);
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  marker.setMap(map);

  // 지도 클릭 이벤트 리스너 추가
  kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    var latlng = mouseEvent.latLng;


    marker.setPosition(latlng);

    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
        store.commit('setAddr', detailAddr); 
      }
    });
  });

  kakao.maps.event.addListener(map, "center_changed", function () {
    var latlng = map.getCenter();

    moveLat.value = latlng.getLat();
    moveLng.value = latlng.getLng();
  });
};
</script>

<style lang="scss" scoped></style>