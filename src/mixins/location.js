import getLocation from "@/utils/location";

export default {
  data() {
    return { currentLocation: {} };
  },
  methods: {
    getCurrentLocation() {
      return new Promise((resolve, reject) => {
        getLocation(({ latitude, longitude }) => {
          this.$qqmapsdk.reverseGeocoder({
            location: `${latitude},${longitude}`,
            coord_type: 1,
            get_poi: 1,
            poi_options: "policy=2;radius=600",
            success: (result) => {
              const {
                result: {
                  ad_info: { nation, province, city, district },
                  location,
                  pois,
                },
              } = result;
              const [onePois] = pois;
              resolve({
                nation,
                province,
                city,
                district: district || city,
                address: onePois && onePois.address,
                name: onePois && onePois.title,
                pois,
                longitude: location.lng,
                latitude: location.lat,
              });
            },
            fail: (error) => {
              uni.showToast({
                icon: "none",
                title: "获取失败，请重试",
              });
              reject(error);
              console.error(error);
            },
          });
        });
      });
    },
  },
};
