// 伪代码表示 socket 实现的功能

type AF = "IPv4" | "IPv6";
type TP = "TCP" | "UDP";

export function socket(AdressFamily: AF, Trans_Protocol: TP) {
  //参数(ip):需要对应 socket 初始化时的 AF 的类型
  //参数(port):指定服务的端口
  function listen(ip: string, port: number) {}

  function connect(ip: string, port: number) {}

  function close() {}
}
