<script setup>
import { reactive } from 'vue';
import { MapPin, Phone, Mail, Send, Facebook, Instagram, Twitter } from 'lucide-vue-next';

const formData = reactive({
  nombre: '',
  correo: '',
  asunto: '',
  mensaje: ''
});

const handleSubmit = () => {
  if (!formData.nombre || !formData.correo || !formData.asunto || !formData.mensaje) {
    alert('Por favor completa todos los campos');
    return;
  }

  // Simulación de envío exitoso
  alert('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
  formData.nombre = '';
  formData.correo = '';
  formData.asunto = '';
  formData.mensaje = '';
};
</script>

<template>
  <div>
    <!-- Encabezado Principal -->
    <section class="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl mb-6" style="color: #085f63">
          Estamos para apoyarte
        </h1>
        <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Nuestro equipo está disponible para resolver tus dudas y ayudarte en lo que necesites
        </p>
      </div>
    </section>

    <!-- Formulario y Datos de Contacto -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Formulario - Lado Izquierdo -->
          <div>
            <h2 class="text-2xl sm:text-3xl mb-6" style="color: #085f63">
              Envíanos un mensaje
            </h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Nombre Completo -->
              <div>
                <label for="nombre" class="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  id="nombre"
                  type="text"
                  v-model="formData.nombre"
                  placeholder="Tu nombre completo"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors"
                  required
                />
              </div>

              <!-- Correo Institucional -->
              <div>
                <label for="correo" class="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  id="correo"
                  type="email"
                  v-model="formData.correo"
                  placeholder="tucorreo@ejemplo.com"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors"
                  required
                />
              </div>

              <!-- Asunto -->
              <div>
                <label for="asunto" class="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  id="asunto"
                  type="text"
                  v-model="formData.asunto"
                  placeholder="¿En qué podemos ayudarte?"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors"
                  required
                />
              </div>

              <!-- Mensaje -->
              <div>
                <label for="mensaje" class="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  v-model="formData.mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  rows="6"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <!-- Botón Enviar -->
              <button
                type="submit"
                class="w-full py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2"
                style="background-color: #085f63"
              >
                <Send class="w-5 h-5" />
                Enviar Mensaje
              </button>
            </form>
          </div>

          <!-- Datos Oficiales - Lado Derecho -->
          <div class="space-y-6">
            <h2 class="text-2xl sm:text-3xl mb-6" style="color: #085f63">
              Información de contacto
            </h2>

            <!-- Tarjeta Dirección -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #49beb7">
                  <MapPin class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2" style="color: #085f63">
                    Dirección
                  </h3>
                  <p class="text-gray-700 leading-relaxed">
                    Av. Universidad, Edificio Banco Universitario, piso 12, Caracas
                  </p>
                </div>
              </div>
            </div>

            <!-- Tarjeta Teléfono -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #49beb7">
                  <Phone class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2" style="color: #085f63">
                    Teléfono
                  </h3>
                  <a href="tel:+582125555555" class="text-gray-700 hover:text-secondary transition-colors">
                    +58 212-555-5555
                  </a>
                </div>
              </div>
            </div>

            <!-- Tarjeta Email -->
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style="background-color: #49beb7">
                  <Mail class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2" style="color: #085f63">
                    Correo Electrónico
                  </h3>
                  <a href="mailto:info@bancouniversitario.com.ve" class="text-gray-700 hover:text-secondary transition-colors break-all">
                    info@bancouniversitario.com.ve
                  </a>
                </div>
              </div>
            </div>

            <!-- Horario de Atención -->
            <div class="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20">
              <h3 class="text-lg font-semibold mb-3" style="color: #085f63">
                Horario de Atención
              </h3>
              <div class="space-y-2 text-gray-700">
                <p>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                <p>Sábados: 9:00 AM - 1:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Redes Sociales y Mapa -->
    <section class="py-16 lg:py-24 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Redes Sociales -->
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl mb-6" style="color: #085f63">
            Síguenos en redes sociales
          </h2>
          <p class="text-gray-600 mb-8">
            Mantente al día con nuestras novedades y promociones exclusivas
          </p>
          <div class="flex justify-center items-center gap-6">
            <a
              href="https://facebook.com/bancouniversitariove"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center gap-2 group"
            >
              <div class="w-16 h-16 rounded-full flex items-center justify-center transition-all" style="background-color: #49beb7">
                <Facebook class="w-8 h-8 text-white" />
              </div>
              <span class="text-sm text-gray-600 group-hover:text-primary transition-colors">
                @bancouniversitariove
              </span>
            </a>
            <a
              href="https://instagram.com/bancouniversitariove"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center gap-2 group"
            >
              <div class="w-16 h-16 rounded-full flex items-center justify-center transition-all" style="background-color: #49beb7">
                <Instagram class="w-8 h-8 text-white" />
              </div>
              <span class="text-sm text-gray-600 group-hover:text-primary transition-colors">
                @bancouniversitariove
              </span>
            </a>
            <a
              href="https://twitter.com/bancouniversitariove"
              target="_blank"
              rel="noopener noreferrer"
              class="flex flex-col items-center gap-2 group"
            >
              <div class="w-16 h-16 rounded-full flex items-center justify-center transition-all" style="background-color: #49beb7">
                <Twitter class="w-8 h-8 text-white" />
              </div>
              <span class="text-sm text-gray-600 group-hover:text-primary transition-colors">
                @bancouniversitariove
              </span>
            </a>
          </div>
        </div>

        <!-- Mapa -->
        <div class="mt-12">
          <h2 class="text-2xl sm:text-3xl text-center mb-8" style="color: #085f63">
            Nuestra Ubicación
          </h2>
          <div class="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
            <div class="relative w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <!-- Simulación de mapa -->
              <div class="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200"
                  alt="Vista aérea de Caracas"
                  class="w-full h-full object-cover opacity-60"
                />
              </div>
              <div class="relative z-10 bg-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #085f63">
                    <MapPin class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold mb-2" style="color: #085f63">
                      Banco Universitario
                    </h3>
                    <p class="text-sm text-gray-600 leading-relaxed">
                      Av. Universidad, Edificio Banco Universitario, piso 12, Caracas, Venezuela
                    </p>
                    <button
                      class="mt-4 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                      style="background-color: #49beb7; color: white"
                    >
                      Ver en Google Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
