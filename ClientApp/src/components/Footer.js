

export default function Footer() {

    return <footer class=" bg-pattern bg-opacity-30 mt-10  text-white shadow-md">

        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a href="https://flowbite.com/" class="flex items-cente justify-center mb-4 ">
                    {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
                    <span class="self-center text-2xl text-center">Friwo</span>
                </a>
                <ul class="flex flex-wrap justify-center items-center mb-6 text-sm font-medium text-center  sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>

            <span class="block text-sm  text-center">© 2024 <a href="https://flowbite.com/" class="hover:underline">Friwo</a>. All Rights Reserved.</span>
        </div>
    </footer>




}