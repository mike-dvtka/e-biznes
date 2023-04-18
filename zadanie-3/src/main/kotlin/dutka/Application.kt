package dutka

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import dev.kord.core.*
import dev.kord.common.*
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.rest.*
import dev.kord.gateway.*

suspend fun main() {
    val kord = Kord("MTA5Nzk1MDYwMzY5NjY4OTE4Mg.Gy17MG.evsTI4EavreYze7ZOb_lticUO7f9vwYPuNcLRg")

    kord.on<MessageCreateEvent> {
        if (message.content != "!ping") return@on

        message.channel.createMessage("pong!")
    }

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}