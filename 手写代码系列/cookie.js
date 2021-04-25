const cookie = {
  read(name) {
    // ?: 只进行匹配，不进行正则的捕获
    const reg = new RegExp(`(?:^|;\\s*)${name}=([^;]*)`)
    const matchResp = document.cookie.match(reg)
    if (Array.isArray(matchResp) && matchResp.length > 1) {
      return matchResp[1]
    }
    return null
  }
}

// 利用 a 链接可以解析URL

// interface HTMLHyperlinkElementUtils {
//   hash: string;
//   host: string;
//   hostname: string;
//   href: string;
//   toString(): string;
//   readonly origin: string;
//   password: string;
//   pathname: string;
//   port: string;
//   protocol: string;
//   search: string;
//   username: string;
// }