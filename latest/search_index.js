var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#HTTP.jl-Documentation-1",
    "page": "Home",
    "title": "HTTP.jl Documentation",
    "category": "section",
    "text": "HTTP.jl provides a pure Julia library for HTTP functionality."
},

{
    "location": "index.html#HTTP.get",
    "page": "Home",
    "title": "HTTP.get",
    "category": "Function",
    "text": "HTTP.get(uri; kwargs...) -> Response\nHTTP.get(client::HTTP.Client, uri; kwargs...) -> Response\n\nBuild and execute an http \"GET\" request. Query parameters can be passed via the query keyword argument as a Dict. Multiple query parameters with the same key can be passed like Dict(\"key1\"=>[\"value1\", \"value2\"], \"key2\"=>...). Returns a Response object that includes the resulting status code (HTTP.status(r) and HTTP.statustext(r)), response headers (HTTP.headers(r)), cookies (HTTP.cookies(r)), response history if redirects were involved (HTTP.history(r)), and response body (HTTP.body(r) or String(r) or take!(r)).\n\nThe body or payload for a request can be given through the body keyword arugment. The body can be given as a String, Vector{UInt8}, IO, HTTP.FIFOBuffer or Dict argument type. See examples below for how to use an HTTP.FIFOBuffer for asynchronous streaming uploads.\n\nIf the body is provided as a Dict, the request body will be uploaded using the multipart/form-data encoding. The key-value pairs in the Dict will constitute the name and value of each multipart boundary chunk. Files and other large data arguments can be provided as values as IO arguments: either an IOStream such as returned via open(file), an IOBuffer for in-memory data, or even an HTTP.FIFOBuffer. For complete control over the multipart details, an HTTP.Multipart type is provided to support setting the Content-Type, filename, and Content-Transfer-Encoding if desired. See ?HTTP.Multipart for more details.\n\nAdditional keyword arguments supported, include:\n\nheaders::Dict{String,String}: headers given as Dict to be sent with the request\nbody: a request body can be given as a String, Vector{UInt8}, IO, HTTP.FIFOBuffer or Dict; see example below for how to utilize HTTP.FIFOBuffer for \"streaming\" request bodies; a Dict argument will be converted to a multipart form upload\nstream::Bool=false: enable response body streaming; depending on the response body size, the request will return before the full body has been received; as the response body is read, additional bytes will be recieved and put in the response body. Readers should read until eof(response.body) == true; see below for an example of response streaming\nchunksize::Int: if a request body is larger than chunksize, the \"chunked-transfer\" http mechanism will be used and chunks will be sent no larger than chunksize\nconnecttimeout::Float64: sets a timeout on how long to wait when trying to connect to a remote host; default = 10.0 seconds\nreadtimeout::Float64: sets a timeout on how long to wait when receiving a response from a remote host; default = 9.0 seconds\ntlsconfig::TLS.SSLConfig: a valid TLS.SSLConfig which will be used to initialize every https connection\nmaxredirects::Int: the maximum number of redirects that will automatically be followed for an http request\nallowredirects::Bool: whether redirects should be allowed to be followed at all; default = true\nforwardheaders::Bool: whether user-provided headers should be forwarded on redirects; default = false\nretries::Int: # of times a request will be tried before throwing an error; default = 3\nmanagecookies::Bool: whether the request client should automatically store and add cookies from/to requests (following appropriate host-specific & expiration rules)\nstatusraise::Bool: whether an HTTP.StatusError should be raised on a non-2XX response status code\n\nSimple request example:\n\njulia> resp = HTTP.get(\"http://httpbin.org/ip\")\nHTTP.Response:\n\"\"\"\nHTTP/1.1 200 OK\nConnection: keep-alive\nX-Powered-By: Flask\nContent-Length: 32\nVia: 1.1 vegur\nAccess-Control-Allow-Credentials: true\nX-Processed-Time: 0.000903129577637\nDate: Wed, 23 Aug 2017 23:35:59 GMT\nContent-Type: application/json\nAccess-Control-Allow-Origin: *\nServer: meinheld/0.6.1\nContent-Length: 32\n\n{ \n  \"origin\": \"50.207.241.62\"\n}\n\"\"\"\n\n\njulia> String(resp)\n\"{\n  \"origin\": \"65.130.216.45\"\n}\n\"\n\nResponse streaming example (asynchronous download):\n\njulia> r = HTTP.get(\"http://httpbin.org/stream/100\"; stream=true)\nHTTP.Response:\n\"\"\"\nHTTP/1.1 200 OK\nConnection: keep-alive\nX-Powered-By: Flask\nTransfer-Encoding: chunked\nVia: 1.1 vegur\nAccess-Control-Allow-Credentials: true\nX-Processed-Time: 0.000981092453003\nDate: Wed, 23 Aug 2017 23:36:56 GMT\nContent-Type: application/json\nAccess-Control-Allow-Origin: *\nServer: meinheld/0.6.1\n\n[HTTP.Response body of 27415 bytes]\nContent-Length: 27390\n\n{\"id\": 0, \"origin\": \"50.207.241.62\", \"args\": {}, \"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Connection\": \"close\", \"User-Agent\": \"HTTP.jl/0.0.0\", \"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json\"}}\n{\"id\": 1, \"origin\": \"50.207.241.62\", \"args\": {}, \"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Connection\": \"close\", \"User-Agent\": \"HTTP.jl/0.0.0\", \"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json\"}}\n{\"id\": 2, \"origin\": \"50.207.241.62\", \"args\": {}, \"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Connection\": \"close\", \"User-Agent\": \"HTTP.jl/0.0.0\", \"Host\": \"httpbin.org\", \"\n⋮\n\n\"\"\"\n\njulia> body = HTTP.body(r) HTTP.FIFOBuffers.FIFOBuffer(27390, 1048576, 27390, 1, 27391, -1, 27390, UInt8[0x7b, 0x22, 0x69, 0x64, 0x22, 0x3a, 0x20, 0x30, 0x2c, 0x20  …  0x6e, 0x2f, 0x6a, 0x73, 0x6f, 0x6e, 0x22, 0x7d, 0x7d, 0x0a], Condition(Any[]), Task (done) @0x0000000112d84250, true)\n\njulia> while true            println(String(readavailable(body)))            eof(body) && break        end {\"id\": 0, \"origin\": \"50.207.241.62\", \"args\": {}, \"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Connection\": \"close\", \"User-Agent\": \"HTTP.jl/0.0.0\", \"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8,application/json\"}} {\"id\": 1, \"origin\": \"50.207.241.62\", \"args\": {}, \"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Connection\": \"close\", \"User-Agent\": \"HTTP.jl/0.0.0\", \"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8,application/json\"}} {\"id\": 2, \"origin\": \"50.207.241.62\", \"args\": {}, \"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Connection\": \"close\", \"User-Agent\": \"HTTP.jl/0.0.0\", \"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8,application/json\"}} {\"id\": 3, \"origin\": \"50.207.241.62\", \"args\": {}, \"url\": \"http://httpbin.org/stream/100\", \"headers\": {\"Connection\": \"close\", \"User-Agent\": \"HTTP.jl/0.0.0\", \"Host\": \"httpbin.org\", \"Accept\": \"text/html,application/xhtml+xml,application/xml;q=0.9,/;q=0.8,application/json\"}} ...\n\n\nRequest streaming example (asynchronous upload):\n\njulia\n\ncreate a FIFOBuffer for sending our request body\n\nf = HTTP.FIFOBuffer()\n\nwrite initial data\n\nwrite(f, \"hey\")\n\nstart an HTTP.post asynchronously\n\nt = @async HTTP.post(\"http://httpbin.org/post\"; body=f) write(f, \" there \") # as we write to f, it triggers another chunk to be sent in our async request write(f, \"sailor\") close(f) # setting eof on f causes the async request to send a final chunk and return the response\n\nresp = wait(t) # get our response by getting the result of our asynchronous task ```\n\n\n\n"
},

{
    "location": "index.html#HTTP.Client",
    "page": "Home",
    "title": "HTTP.Client",
    "category": "Type",
    "text": "HTTP.Client([logger::IO]; args...)\n\nA type to facilitate connections to remote hosts, send HTTP requests, and manage state between requests. Takes an optional logger IO argument where client activity is recorded (defaults to STDOUT). Additional keyword arguments can be passed that will get transmitted with each HTTP request:\n\nchunksize::Int: if a request body is larger than chunksize, the \"chunked-transfer\" http mechanism will be used and chunks will be sent no larger than chunksize\nconnecttimeout::Float64: sets a timeout on how long to wait when trying to connect to a remote host; default = 10.0 seconds\nreadtimeout::Float64: sets a timeout on how long to wait when receiving a response from a remote host; default = 9.0 seconds\ntlsconfig::TLS.SSLConfig: a valid TLS.SSLConfig which will be used to initialize every https connection\nmaxredirects::Int: the maximum number of redirects that will automatically be followed for an http request\nallowredirects::Bool: whether redirects should be allowed to be followed at all; default = true\nforwardheaders::Bool: whether user-provided headers should be forwarded on redirects; default = false\nretries::Int: # of times a request will be tried before throwing an error; default = 3\nmanagecookies::Bool: whether the request client should automatically store and add cookies from/to requests (following appropriate host-specific & expiration rules)\nstatusraise::Bool: whether an HTTP.StatusError should be raised on a non-2XX response status code\ninsecure::Bool: whether an \"https\" connection should allow insecure connections (no TLS verification); default = false\n\n\n\n"
},

{
    "location": "index.html#HTTP.Connection",
    "page": "Home",
    "title": "HTTP.Connection",
    "category": "Type",
    "text": "HTTP.Connection\n\nRepresents a persistent client connection to a remote host; only created when a server response includes the \"Connection: keep-alive\" header. An open and non-idle connection will be reused when sending subsequent requests to the same host.\n\n\n\n"
},

{
    "location": "index.html#Requests-1",
    "page": "Home",
    "title": "Requests",
    "category": "section",
    "text": "Note that the HTTP methods of POST, DELETE, PUT, etc. all follow the same format as HTTP.get, documented below.HTTP.get\nHTTP.Client\nHTTP.Connection"
},

{
    "location": "index.html#HTTP.Nitrogen.serve",
    "page": "Home",
    "title": "HTTP.Nitrogen.serve",
    "category": "Function",
    "text": "HTTP.serve([server,] host::IPAddr, port::Int; verbose::Bool=true, kwargs...)\n\nStart a server listening on the provided host and port. verbose indicates whether server activity should be logged. Optional keyword arguments allow construction of Server on the fly if the server argument isn't provided directly. See ?HTTP.Server for more details on server construction and supported keyword arguments. By default, HTTP.serve aims to \"never die\", catching and recovering from all internal errors. Two methods for stopping HTTP.serve include interrupting (ctrl/cmd+c) if blocking on the main task, or sending the kill signal via the server's in channel (put!(server.in, HTTP.KILL)).\n\n\n\n"
},

{
    "location": "index.html#HTTP.Nitrogen.Server",
    "page": "Home",
    "title": "HTTP.Nitrogen.Server",
    "category": "Type",
    "text": "Server(handler, logger::IO=STDOUT; kwargs...)\n\nAn http/https server. Supports listening on a host and port via the HTTP.serve(server, host, port) function. handler is a function of the form f(::Request, ::Response) -> HTTP.Response, i.e. it takes both a Request and pre-built Response objects as inputs and returns the, potentially modified, Response. logger indicates where logging output should be directed. When HTTP.serve is called, it aims to \"never die\", catching and recovering from all internal errors. To forcefully stop, one can obviously kill the julia process, interrupt (ctrl/cmd+c) if main task, or send the kill signal over a server in channel like: put!(server.in, HTTP.KILL).\n\nSupported keyword arguments include:\n\ncert: if https, the cert file to use, as passed to HTTP.TLS.SSLConfig(cert, key)\nkey: if https, the key file to use, as passed to HTTP.TLS.SSLConfig(cert, key)\ntlsconfig: pass in an already-constructed HTTP.TLS.SSLConfig instance\nreadtimeout: how long a client connection will be left open without receiving any bytes\nratelimit: a Rational{Int} of the form 5//1 indicating how many messages//second should be allowed per client IP address; requests exceeding the rate limit will be dropped\nmaxuri: the maximum size in bytes that a request uri can be; default 8000\nmaxheader: the maximum size in bytes that request headers can be; default 8kb\nmaxbody: the maximum size in bytes that a request body can be; default 4gb\nsupport100continue: a Bool indicating whether Expect: 100-continue headers should be supported for delayed request body sending; default = true\n\n\n\n"
},

{
    "location": "index.html#HTTP.Handlers.Handler",
    "page": "Home",
    "title": "HTTP.Handlers.Handler",
    "category": "Type",
    "text": "Abstract type representing an object that knows how to \"handle\" a server request.\n\nTypes of handlers include HandlerFunction (a julia function of the form f(request, response) and Router (which pattern matches request url paths to other specific Handler types).\n\n\n\n"
},

{
    "location": "index.html#HTTP.Handlers.HandlerFunction",
    "page": "Home",
    "title": "HTTP.Handlers.HandlerFunction",
    "category": "Type",
    "text": "HandlerFunction(f::Function)\n\nA Function-wrapper type that is a subtype of Handler. Takes a single Function as an argument. The provided argument should be of the form f(request, response) => Response, i.e. it accepts both a Request and Response and returns a Response. \n\n\n\n"
},

{
    "location": "index.html#HTTP.Handlers.Router",
    "page": "Home",
    "title": "HTTP.Handlers.Router",
    "category": "Type",
    "text": "Router(h::Handler) Router(f::Function) Router()\n\nAn HTTP.Handler type that supports mapping request url paths to other HTTP.Handler types. Can accept a default Handler or Function that will be used in case no other handlers match; by default, a 404 response handler is used. Paths can be mapped to a handler via HTTP.register!(r::Router, path, handler), see ?HTTP.register! for more details.\n\n\n\n"
},

{
    "location": "index.html#HTTP.Handlers.register!",
    "page": "Home",
    "title": "HTTP.Handlers.register!",
    "category": "Function",
    "text": "HTTP.register!(r::Router, url, handler) HTTP.register!(r::Router, m::Union{Method, String}, url, handler)\n\nFunction to map request urls matching url and an optional method m to another handler::HTTP.Handler. URLs are registered one at a time, and multiple urls can map to the same handler. Methods can be passed as a string \"GET\" or enum object directly HTTP.GET. The URL can be passed as a String or HTTP.URI object directly. Requests can be routed based on: method, scheme, hostname, or path. The following examples show how various urls will direct how a request is routed by a server:\n\n\"http://*\": match all HTTP requests, regardless of path\n\"https://*\": match all HTTPS requests, regardless of path\n\"google\": regardless of scheme, match requests to the hostname \"google\"\n\"google/gmail\": match requests to hostname \"google\", and path starting with \"gmail\"\n\"/gmail\": regardless of scheme or host, match any request with a path starting with \"gmail\"\n\"/gmail/userId/*/inbox: match any request matching the path pattern, \"*\" is used as a wildcard that matches any value between the two \"/\"\n\n\n\n"
},

{
    "location": "index.html#Server-/-Handlers-1",
    "page": "Home",
    "title": "Server / Handlers",
    "category": "section",
    "text": "HTTP.serve\nHTTP.Server\nHTTP.Handler\nHTTP.HandlerFunction\nHTTP.Router\nHTTP.register!"
},

{
    "location": "index.html#HTTP.URIs.URI",
    "page": "Home",
    "title": "HTTP.URIs.URI",
    "category": "Type",
    "text": "HTTP.URL(host; userinfo=\"\", path=\"\", query=\"\", fragment=\"\", isconnect=false)\nHTTP.URI(; scheme=\"\", hostname=\"\", port=\"\", ...)\nHTTP.URI(str; isconnect=false)\nparse(HTTP.URI, str::String; isconnect=false)\n\nA type representing a valid uri. Can be constructed from distinct parts using the various supported keyword arguments. With a raw, already-encoded uri string, use parse(HTTP.URI, str) to parse the HTTP.URI directly. The HTTP.URI constructors will automatically escape any provided query arguments, typically provided as \"key\"=>\"value\"::Pair or Dict(\"key\"=>\"value\"). Note that multiple values for a single query key can provided like Dict(\"key\"=>[\"value1\", \"value2\"]).\n\nFor efficiency, the internal representation is stored as a set of offsets and lengths to the various uri components. To access and return these components as strings, use the various accessor methods:\n\nHTTP.scheme: returns the scheme (if any) associated with the uri\nHTTP.userinfo: returns the userinfo (if any) associated with the uri\nHTTP.hostname: returns the hostname only of the uri\nHTTP.port: returns the port of the uri; will return \"80\" or \"443\" by default if the scheme is \"http\" or \"https\", respectively\nHTTP.host: returns the \"hostname:port\" combination\nHTTP.path: returns the path for a uri\nHTTP.query: returns the query for a uri\nHTTP.fragment: returns the fragment for a uri\nHTTP.resource: returns the path-query-fragment combination\n\n\n\n"
},

{
    "location": "index.html#HTTP.Request",
    "page": "Home",
    "title": "HTTP.Request",
    "category": "Type",
    "text": "Request()\nRequest(method, uri, headers, body; options=RequestOptions())\nRequest(; method=HTTP.GET, uri=HTTP.URI(\"\"), major=1, minor=1, headers=HTTP.Headers(), body=\"\")\n\nA type representing an http request. method can be provided as a string or HTTP.GET type enum. uri can be provided as an actual HTTP.URI or string. headers should be provided as a Dict. body may be provided as string, byte vector, IO, or HTTP.FIFOBuffer. options should be a RequestOptions type, see ?HTTP.RequestOptions for details.\n\nAccessor methods include:\n\nHTTP.method: method for a request\nHTTP.major: major http version for a request\nHTTP.minor: minor http version for a request\nHTTP.uri: uri for a request\nHTTP.headers: headers for a request\nHTTP.body: body for a request as a HTTP.FIFOBuffer\n\nTwo convenience methods are provided for accessing a request body:\n\ntake!(r): consume the request body, returning it as a Vector{UInt8}\nString(r): consume the request body, returning it as a String\n\n\n\n"
},

{
    "location": "index.html#HTTP.RequestOptions",
    "page": "Home",
    "title": "HTTP.RequestOptions",
    "category": "Type",
    "text": "RequestOptions(; chunksize=, connecttimeout=, readtimeout=, tlsconfig=, maxredirects=, allowredirects=)\n\nA type to represent various http request options. Lives as a separate type so that options can be set at the HTTP.Client level to be applied to every request sent. Options include:\n\nchunksize::Int: if a request body is larger than chunksize, the \"chunked-transfer\" http mechanism will be used and chunks will be sent no larger than chunksize\nconnecttimeout::Float64: sets a timeout on how long to wait when trying to connect to a remote host; default = 10.0 seconds\nreadtimeout::Float64: sets a timeout on how long to wait when receiving a response from a remote host; default = 9.0 seconds\ntlsconfig::TLS.SSLConfig: a valid TLS.SSLConfig which will be used to initialize every https connection\nmaxredirects::Int: the maximum number of redirects that will automatically be followed for an http request\nallowredirects::Bool: whether redirects should be allowed to be followed at all; default = true\nforwardheaders::Bool: whether user-provided headers should be forwarded on redirects; default = false\nretries::Int: # of times a request will be tried before throwing an error; default = 3\nmanagecookies::Bool: whether the request client should automatically store and add cookies from/to requests (following appropriate host-specific & expiration rules)\nstatusraise::Bool: whether an HTTP.StatusError should be raised on a non-2XX response status code\ninsecure::Bool: whether an \"https\" connection should allow insecure connections (no TLS verification); default = false\n\n\n\n"
},

{
    "location": "index.html#HTTP.Response",
    "page": "Home",
    "title": "HTTP.Response",
    "category": "Type",
    "text": "Response(status::Integer)\nResponse(status::Integer, body::String)\nResponse(status::Integer, headers, body)\nResponse(; status=200, cookies=HTTP.Cookie[], headers=HTTP.Headers(), body=\"\")\n\nA type representing an http response. status represents the http status code for the response. headers should be provided as a Dict. body can be provided as a string, byte vector, IO, or HTTP.FIFOBuffer.\n\nAccessor methods include:\n\nHTTP.status: status for a response\nHTTP.statustext: statustext for a response\nHTTP.major: major http version for a response\nHTTP.minor: minor http version for a response\nHTTP.cookies: cookies for a response, returned as a Vector{HTTP.Cookie}\nHTTP.headers: headers for a response\nHTTP.request: the HTTP.Request that resulted in this response\nHTTP.history: history for a response if redirects were followed from an original request\nHTTP.body: body for a response as a HTTP.FIFOBuffer\n\nTwo convenience methods are provided for accessing a response body:\n\ntake!(r): consume the response body, returning it as a Vector{UInt8}\nString(r): consume the response body, returning it as a String\n\n\n\n"
},

{
    "location": "index.html#HTTP.Cookies.Cookie",
    "page": "Home",
    "title": "HTTP.Cookies.Cookie",
    "category": "Type",
    "text": "Cookie()\nCookie(; kwargs...)\nCookie(name, value; kwargs...)\n\nA Cookie represents an HTTP cookie as sent in the Set-Cookie header of an HTTP response or the Cookie header of an HTTP request. Supported fields (which can be set using keyword arguments) include:\n\nname: name of the cookie\nvalue: value of the cookie\npath: applicable path for the cookie\ndomain: applicable domain for the cookie\nexpires: a DateTime representing when the cookie should expire\nmaxage: maxage == 0 means no max age, maxage < 0 means delete cookie now, max age > 0 means the # of seconds until expiration\nsecure::Bool: secure cookie attribute\nhttponly::Bool: httponly cookie attribute\nhostonly::Bool: hostonly cookie attribute\n\nSee http:#tools.ietf.org/html/rfc6265 for details.\n\n\n\n"
},

{
    "location": "index.html#HTTP.FIFOBuffers.FIFOBuffer",
    "page": "Home",
    "title": "HTTP.FIFOBuffers.FIFOBuffer",
    "category": "Type",
    "text": "FIFOBuffer([max::Integer])\nFIFOBuffer(string_or_bytes_vector)\nFIFOBuffer(io::IO)\n\nA FIFOBuffer is a first-in, first-out, in-memory, async-friendly IO buffer type.\n\nFIFOBuffer([max]): creates a \"open\" FIFOBuffer with a maximum size of max; this means that bytes can be written up until max number of bytes have been written (with none being read). At this point, the FIFOBuffer is full and will return 0 for all subsequent writes. If no max (FIFOBuffer()) argument is given, then a default size of typemax(Int32)^2 is used; this essentially allows all writes every time. Note that providing a string or byte vector argument mirrors the behavior of Base.IOBuffer in that the max size of the FIFOBuffer is the length of the string/byte vector; it is also not writeable.\n\nReading is supported via readavailable(f) and read(f, nb), which returns all or nb bytes, respectively, starting at the earliest bytes written. All read functions will return an empty byte vector, even if the buffer has been closed. Checking eof will correctly reflect when the buffer has been closed and no more bytes will be available for reading.\n\nYou may call String(f::FIFOBuffer) to view the current contents in the buffer without consuming them.\n\nA FIFOBuffer is built to be used asynchronously to allow buffered reading and writing. In particular, a FIFOBuffer detects if it is being read from/written to the main task, or asynchronously, and will behave slightly differently depending on which.\n\nSpecifically, when reading from a FIFOBuffer, if accessed from the main task, it will not block if there are no bytes available to read, instead returning an empty UInt8[]. If being read from asynchronously, however, reading will block until additional bytes have been written. An example of this in action is:\n\nf = HTTP.FIFOBuffer(5) # create a FIFOBuffer that will hold at most 5 bytes, currently empty\nf2 = HTTP.FIFOBuffer(5) # a 2nd buffer that we'll write to asynchronously\n\n# start an asynchronous writing task with the 2nd buffer\ntsk = @async begin\n    while !eof(f)\n        write(f2, readavailable(f))\n    end\nend\n\n# now write some bytes to the first buffer\n# writing triggers our async task to wake up and read the bytes we just wrote\n# leaving the first buffer empty again and blocking again until more bytes have been written\nwrite(f, [0x01, 0x02, 0x03, 0x04, 0x05])\n\n# we can see that `f2` now holds the bytes we wrote to `f`\nString(readavailable(f2))\n\n# our async task will continue until `f` is closed\nclose(f)\n\nistaskdone(tsk) # true\n\n\n\n"
},

{
    "location": "index.html#HTTP-Types-1",
    "page": "Home",
    "title": "HTTP Types",
    "category": "section",
    "text": "HTTP.URI\nHTTP.Request\nHTTP.RequestOptions\nHTTP.Response\nHTTP.Cookie\nHTTP.FIFOBuffer"
},

{
    "location": "index.html#HTTP.parse",
    "page": "Home",
    "title": "HTTP.parse",
    "category": "Function",
    "text": "HTTP.parse([HTTP.Request, HTTP.Response], str; kwargs...)\n\nParse a HTTP.Request or HTTP.Response from a string. str must contain at least one full request or response (but may include more than one). Supported keyword arguments include:\n\nextra: a Ref{String} that will be used to store any extra bytes beyond a full request or response\nlenient: whether the request/response parsing should allow additional characters\nmaxuri: the maximum allowed size of a uri in a request\nmaxheader: the maximum allowed size of headers\nmaxbody: the maximum allowed size of a request or response body\n\n\n\n"
},

{
    "location": "index.html#HTTP.URIs.escape",
    "page": "Home",
    "title": "HTTP.URIs.escape",
    "category": "Function",
    "text": "percent-encode a string, dict, or pair for a uri\n\n\n\n"
},

{
    "location": "index.html#HTTP.URIs.unescape",
    "page": "Home",
    "title": "HTTP.URIs.unescape",
    "category": "Function",
    "text": "unescape a percent-encoded uri/url\n\n\n\n"
},

{
    "location": "index.html#HTTP.URIs.splitpath",
    "page": "Home",
    "title": "HTTP.URIs.splitpath",
    "category": "Function",
    "text": "Splits the path into components See: http://tools.ietf.org/html/rfc3986#section-3.3\n\n\n\n"
},

{
    "location": "index.html#Base.isvalid",
    "page": "Home",
    "title": "Base.isvalid",
    "category": "Function",
    "text": "checks if a HTTP.URI is valid\n\n\n\n"
},

{
    "location": "index.html#HTTP.sniff",
    "page": "Home",
    "title": "HTTP.sniff",
    "category": "Function",
    "text": "HTTP.sniff(content::Union{Vector{UInt8}, String, IO}) => String (mimetype)\n\nHTTP.sniff will look at the first 512 bytes of content to try and determine a valid mimetype. If a mimetype can't be determined appropriately, \"application/octet-stream\" is returned.\n\nSupports JSON detection through the HTTP.isjson(content) function.\n\n\n\n"
},

{
    "location": "index.html#HTTP.escapeHTML",
    "page": "Home",
    "title": "HTTP.escapeHTML",
    "category": "Function",
    "text": "escapeHTML(i::String)\n\nReturns a string with special HTML characters escaped: &, <, >, \", '\n\n\n\n"
},

{
    "location": "index.html#HTTP-Utilities-1",
    "page": "Home",
    "title": "HTTP Utilities",
    "category": "section",
    "text": "HTTP.parse\nHTTP.escape\nHTTP.unescape\nHTTP.splitpath\nHTTP.isvalid\nHTTP.sniff\nHTTP.escapeHTML"
},

]}
