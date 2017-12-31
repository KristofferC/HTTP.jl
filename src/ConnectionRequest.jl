module ConnectionRequest

import ..Layer, ..request
using ..URIs
using ..Messages
using ..ConnectionPool
using MbedTLS.SSLContext
import ..@debug, ..DEBUG_LEVEL


abstract type ConnectionPoolLayer{Next <: Layer} <: Layer end
export ConnectionPoolLayer


sockettype(uri::URI) = uri.scheme == "https" ? SSLContext : TCPSocket


"""
    request(ConnectionLayer{Connection, Next}, ::URI, ::Request, ::Response)

Get a `Connection` for a `URI`, send a `Request` and fill in a `Response`.
"""

function request(::Type{ConnectionPoolLayer{Next}}, uri::URI, req, body;
                 connectionpool::Bool=true, kw...) where Next

    SocketType = sockettype(uri)
    if connectionpool
        SocketType = ConnectionPool.Transaction{SocketType}
    end
    io = getconnection(SocketType, uri.host, uri.port; kw...)

    try
        r = request(Next, io, req, body; kw...)
        if !connectionpool
            close(io)
        end
        return r
    catch e
        @debug 0 "❗️  ConnectionLayer $e. Closing: $io"
        close(io)
        rethrow(e)
    end
end


end # module ConnectionRequest
