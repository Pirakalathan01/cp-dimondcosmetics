<script setup>
const year = new Date().getFullYear();

const footerNavigation = {

  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  account: [
    { name: 'Manage Account', href: '#' },
    { name: 'Returns & Exchanges', href: '#' },
    { name: 'Redeem a Gift Card', href: '#' },
  ],
  connect: [
    { name: 'Contact Us', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
  ],
}

</script>

<template>
  <footer aria-labelledby="footer-heading" class="bg-gray-900">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
        <div class="grid grid-cols-2 gap-8 xl:col-span-2">
          <div class="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-medium text-white">Company</h3>
              <ul role="list" class="mt-6 space-y-6">
                <li v-for="item in footerNavigation.company" :key="item.name" class="text-sm">
                  <a :href="item.href" class="text-gray-300 hover:text-white">
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-sm font-medium text-white">Account</h3>
              <ul role="list" class="mt-6 space-y-6">
                <li v-for="item in footerNavigation.account" :key="item.name" class="text-sm">
                  <a :href="item.href" class="text-gray-300 hover:text-white">
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-medium text-white">Connect</h3>
              <ul role="list" class="mt-6 space-y-6">
                <li v-for="item in footerNavigation.connect" :key="item.name" class="text-sm">
                  <a :href="item.href" class="text-gray-300 hover:text-white">
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-800 py-10">
        <p class="text-sm text-gray-400">Copyright &copy; {{ year }} Diamond Cosmetics Pvt. Ltd.</p>
      </div>
    </div>
  </footer>
</template>


