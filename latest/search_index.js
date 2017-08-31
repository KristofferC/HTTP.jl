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
    "location": "index.html#Requests-1",
    "page": "Home",
    "title": "Requests",
    "category": "section",
    "text": "Note that the HTTP methods of POST, DELETE, PUT, etc. all follow the same format as HTTP.get, documented below.HTTP.get\nHTTP.request\nHTTP.Client\nHTTP.Connection"
},

{
    "location": "index.html#Server-/-Handlers-1",
    "page": "Home",
    "title": "Server / Handlers",
    "category": "section",
    "text": "HTTP.serve\nHTTP.Server\nHTTP.Handler\nHTTP.HandlerFunction\nHTTP.Router\nHTTP.register!\nHTTP.FourOhFour"
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
    "text": "RequestOptions(; chunksize=, connecttimeout=, readtimeout=, tlsconfig=, maxredirects=, allowredirects=)\n\nA type to represent various http request options. Lives as a separate type so that options can be set at the HTTP.Client level to be applied to every request sent. Options include:\n\nchunksize::Int: if a request body is larger than chunksize, the \"chunked-transfer\" http mechanism will be used and chunks will be sent no larger than chunksize\nconnecttimeout::Float64: sets a timeout on how long to wait when trying to connect to a remote host; default = 10.0 seconds\nreadtimeout::Float64: sets a timeout on how long to wait when receiving a response from a remote host; default = 9.0 seconds\ntlsconfig::TLS.SSLConfig: a valid TLS.SSLConfig which will be used to initialize every https connection\nmaxredirects::Int: the maximum number of redirects that will automatically be followed for an http request\nallowredirects::Bool: whether redirects should be allowed to be followed at all; default = true\nforwardheaders::Bool: whether user-provided headers should be forwarded on redirects; default = false\nretries::Int: # of times a request will be tried before throwing an error; default = 3\nmanagecookies::Bool: whether the request client should automatically store and add cookies from/to requests (following appropriate host-specific & expiration rules)\nstatusraise::Bool: whether an HTTP.StatusError should be raised on a non-2XX response status code\n\n\n\n"
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
