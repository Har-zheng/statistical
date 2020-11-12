import request from "@/utils/request";
export function analyzer(data) {
  //  /api/analyzer/analysis
  return request({
    url: "/api/analyzer/analysis",
    method: "post",
    data: {
      version: 1,
      data
    }
  });
}
