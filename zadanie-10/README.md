# zadanie-10

Zrobiłem prosty CRUD w node.js jako aplikację backend i prostą stronkę która fetchuje dane z backendu jako aplikację frontend. Dla obu aplikacji utworzyłem potrzebny Dockerfile. 
Założyłem konto na AWS, wrzuciłem obrazy dockerowe do Elastic Container Registry, utworzyłem clustery i uruchomiłem odpowiednie taski (jeden dla backendu i jeden dla frontendu) w wyniku czego powstały instancje na EC2 (maszyna wirtualna z backendem i maszyna wirtualna z frontendem).
Na końcu musiałem jeszcze trochę pogrzebać w ustawieniach portów w Security Group, ale koniec końców wszystko działa. Instancje wyłączyłem bo nie są chronione i nie chciałbym żeby ktoś mi narobił kosztów, ale jako dowód dodaje screenshoty.
