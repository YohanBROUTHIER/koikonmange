import urlQueryJsonParser from "url-query-json-parser";

export default function (str) {
  if (!str) {
    return;
  }
  return urlQueryJsonParser.default.parseQuery(str);
}