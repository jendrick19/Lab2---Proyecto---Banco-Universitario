<template>
  
  <aside class="w-72 fixed top-0 bottom-0 left-0 bg-white border-r border-gray-100 flex flex-col justify-between p-6 z-50">
    
    
    <div>
      <!-- CONTENEDOR DEL LOGO -->
      <div class="flex items-center gap-3 w-full mb-8 flex-nowrap">
        <img src="@/assets/logo-no-background.png" alt="Banco Universitario" class="h-10 w-auto object-contain" />
      </div>

      <!-- MENÚ DE NAVEGACIÓN -->
      <nav class="flex flex-col gap-2">
        <!-- Dashboard (Estado Activo) -->
        <router-link 
          to="/dashboard" 
          class="flex items-center gap-4 px-4 py-3 rounded-xl bg-teal-50/70 text-teal-700 font-semibold transition-all duration-200 group"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal-600"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          <span class="text-[16px] tracking-wide whitespace-nowrap">Dashboard</span>
        </router-link>

        <!-- Historial de Movimientos -->
        <router-link 
          to="/movimientos" 
          class="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition-all duration-200 group"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 group-hover:text-slate-600"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><polyline points="3 3 3 8 8 8"/><line x1="12" x2="12" y1="7" y2="12"/><polyline points="12 12 16 14"/></svg>
          <span class="text-[16px] tracking-wide">Historial de Movimientos</span>
        </router-link>

        <!-- Transferir -->
        <router-link 
          to="/transferir" 
          class="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition-all duration-200 group"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 group-hover:text-slate-600"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
          <span class="text-[16px] tracking-wide whitespace-nowrap">Transferir</span>
        </router-link>

        <!-- Contactos -->
        <router-link 
          to="/contactos" 
          class="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition-all duration-200 group"
        >
         
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 group-hover:text-slate-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span class="text-[16px] tracking-wide whitespace-nowrap">Contactos</span>
        </router-link>

        <!-- Mi Perfil -->
        <router-link 
          to="/perfil" 
          class="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium transition-all duration-200 group"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 group-hover:text-slate-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span class="text-[16px] tracking-wide whitespace-nowrap">Mi Perfil</span>
        </router-link>
      </nav>
    </div>

    
    <div class="border-t border-slate-100 pt-4">
      <button class="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50/60 font-medium transition-all duration-200 group">
        <!-- Ícono de Cerrar Sesión contorno -->
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 group-hover:text-red-500"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        <span class="text-[16px] tracking-wide whitespace-nowrap">Cerrar Sesión</span>
      </button>
    </div>

  </aside>
</template>

<script>
export default {
  name: 'DashboardSidebar'
}
</script>