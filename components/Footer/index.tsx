export default function Footer(){
    return(
        <>
        <div className="bg-[#191919] text-white text-center py-10">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                    <p className="text-[1.25rem] font-bold">About Us</p>
                    <p className="text-[0.875rem]">About PROME</p>
                    <p className="text-[0.875rem]">Our Team</p>
                    <p className="text-[0.875rem]">Careers</p>
                    <p className="text-[0.875rem]">Partners</p>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-[1.25rem] font-bold">Resources</p>
                    <p className="text-[0.875rem]">FAQ</p>
                    <p className="text-[0.875rem]">Blog</p>
                    <p className="text-[0.875rem]">Whitepaper</p>
                    <p className="text-[0.875rem]">Support</p>
                </div>
            </div>
            <div className="mt-6">
                <p className="text-[0.875rem]">© 2024 PROME Network. All rights reserved.</p>
            </div>
        </div>
        </>
    )
}   