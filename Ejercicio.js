console.log("Hola :)"); 
const axios = require( "axios");
const fs = require("fs");
const http = require("http");

http
    .createServer(function(req, res)
    {
        switch(req.url){
            case "/api/proveedores":
                fs.readFile("Proveedores.html","utf-8", async function(err,data){

                    const resp = await axios.get("https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json");
                    filas = "";
                    datap = resp.data; 
                    for(let i = 0; i < datap.length; i++){
                        filas += "<tr><td> "+ datap[i].idproveedor+ "</td><td>"+ datap[i].nombrecompania+"</td><td>"+ datap[i].nombrecontacto+"</td></tr>\n";

                    }
                    data2 = data.replace("{{data23}}",filas);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data2);
                    return res.end();
                });
                break;
            case "/api/clientes":
                fs.readFile("Clientes.html","utf-8",async function(err,data){
                    const resp = await axios.get("https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json");
                    filas = "";
                    datap = resp.data; 
                    for(let i = 0; i < datap.length; i++){
                        filas += "<tr><td> "+ datap[i].idCliente+ "</td><td>"+ datap[i].NombreCompania+"</td><td>"+ datap[i].NombreContacto+"</td></tr>\n";

                    }
                    data2 = data.replace("{{data23}}",filas);
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data2);
                    return res.end();

                });
                break;
            default:
                res.writeHead(404);
                return res.end("URL invalida");
                
        }
       

    })
    .listen(8081);