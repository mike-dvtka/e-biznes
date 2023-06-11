package dutka.plugins

import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.http.content.*
import io.ktor.server.application.*
import io.ktor.server.request.*

fun Application.configureRouting() {

    routing {
        get("/") {
            call.respondRedirect("http://127.0.0.1:8080/index.html")

        }
        get("/send") {
            val kord = Kord("MTA5Nzk1MDYwMzY5NjY4OTE4Mg.Gy17MG.evsTI4EavreYze7ZOb_lticUO7f9vwYPuNcLRg")

            kord.on<MessageCreateEvent> {
                if (message.content != "!bot") return@on

                call.request.queryParameters["text"]?.let { it1 -> message.channel.createMessage(it1) }
            }

            kord.login {
                @OptIn(PrivilegedIntent::class)
                intents += Intent.MessageContent
            }
            call.respondRedirect("http://127.0.0.1:8080/index.html")
        }

        static("/") {
            resources("static")

        }
    }
}
