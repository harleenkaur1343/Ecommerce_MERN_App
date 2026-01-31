import dns from "dns";

//dns.setDefaultResultOrder("ipv4first");
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.lookup("projects.ioryfe3.mongodb.net", (err, address, family) => {
  console.log("Address:", address);
  console.log("Family:", family);
  console.log("Error", err)
});
