const commonParams = {
  // 公共ip
  baseIP: "/api",
  // baseIP:"https://testpm.haiercash.com",
  // baseIP:"https://app.haiercash.com",
  docIP: "https://testpm.haiercash.com:9002",
  globalHeader: {
    channel: 11,
    channel_no: 45,
    "Content-Type": "application/json;charset=UTF-8"
  },
  noToken: ["/app/appserver/uauth/isRegister", "/app/appserver/customerLogin"]
};
export default commonParams;
