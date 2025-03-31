import { useState } from 'react';
import { FaBox, FaTools, FaShoppingCart, FaClipboardList, FaHourglassHalf, FaQuestionCircle } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaHeartbeat, FaPaintBrush, FaHandsHelping } from 'react-icons/fa';
import { MdSelfImprovement, MdMiscellaneousServices } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';


const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [collapsed, setCollapsed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const toggleDropdown = (section: string) => {
        if (collapsed) return;
        setOpenDropdown(openDropdown === section ? null : section);
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
        if (!collapsed) {
            setOpenDropdown(null);
        }
    };

    const services = [
        { name: 'Home and Repairs', icon: <FaTools size={24} className="text-gray-700" />, items: ['Plumbers', 'Electrician', 'Painters', 'Movers', 'Cleaners'] },
        { name: 'SelfCare', icon: <MdSelfImprovement size={24} className="text-gray-700" />, items: ['Make-Up Artist', 'Nail Technician', 'Laundry', 'Restaurant', 'Spa and Wellness', 'Gym/Gym Instructor', 'Hair Styling', 'Chef'] },
        { name: 'Health', icon: <FaHeartbeat size={24} className="text-gray-700" />, items: ['Doctors', 'Ambulance Service', 'Chemist', 'Nurses', 'Therapist', 'Caregivers'] },
        { name: 'Art and Learning', icon: <FaPaintBrush size={24} className="text-gray-700" />, items: ['Music Teachers', 'Dance Instructors', 'Tutors', 'Photography', 'Calligraphy'] },
        { name: 'Auxiliary Services', icon: <MdMiscellaneousServices size={24} className="text-gray-700" />, items: ['Security Guards', 'Event Planning', 'Catering', 'Logistics', 'Car Rentals'] }
    ];

    // Define other menu items with their icons
    const otherMenuItems = [
        { name: 'Products', icon: <FaBox size={24} className="text-gray-700" />, items: ['Phones & Tablets', 'TVs & Audio', 'Appliances', 'Health & Beauty', 'Home & Office', 'Fashion', 'Computing', 'Gaming', 'Baby Products', 'Sporting Goods', 'Supermarket', 'Garden & Outdoors'] },
        { name: 'Wholesale', icon: <FaShoppingCart size={24} className="text-gray-700" />, items: [] },
        { name: 'Orders', icon: <FaClipboardList size={24} className="text-gray-700" />, items: [] },
        { name: 'Pending', icon: <FaHourglassHalf size={24} className="text-gray-700" />, items: [] },
        { name: 'Help Center', icon: <FaQuestionCircle size={24} className="text-gray-700" />, items: [] }
    ];

    return (
        <div className={`${collapsed ? 'w-20' : 'w-64'} bg-white shadow-md p-4 top-0 left-0 h-full z-50 transition-all duration-300 relative mt-10`}>
            <div 
                className="absolute -right-4 top-6 bg-white rounded-full shadow-md p-2 cursor-pointer"
                onClick={toggleSidebar}
            >
                {collapsed ? <IoIosArrowForward size={20} className='text-black'/> : <IoIosArrowBack size={20} className='text-black' />}
            </div>
            
            <ul className="space-y-6">
                {/* Products Dropdown */}
                <li 
                    className="relative group cursor-pointer flex items-center justify-between py-2 text-black"
                    onClick={() => toggleDropdown('products')}
                    onMouseEnter={() => collapsed && setHoveredItem('Products')}
                    onMouseLeave={() => collapsed && setHoveredItem(null)}
                >
                    <div className="flex items-center gap-3">
                        <FaBox size={24} className="text-gray-700" />
                        {!collapsed && <span className="text-lg font-semibold text-black">Products</span>}
                    </div>
                    {!collapsed && <IoIosArrowDown size={20} />}
                    
                    {/* Tooltip for collapsed state */}
                    {collapsed && hoveredItem === 'Products' && (
                        <div className="absolute left-full ml-2 top-0 w-56 bg-white shadow-lg p-2 z-50 border border-gray-300">
                            <div className="font-semibold border-b pb-2 mb-2 text-black">Products</div>
                            <ul>
                                {otherMenuItems[0].items.map((item) => (
                                    <li key={item} className="p-2 text-gray-700 hover:bg-gray-200">{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    {/* Hover dropdown for expanded state */}
                    {!collapsed && (
                        <ul className="absolute left-full top-0 w-48 bg-white shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-300">
                            {otherMenuItems[0].items.map((item) => (
                                <li key={item} className="p-2 text-black hover:bg-gray-200">{item}</li>
                            ))}
                        </ul>
                    )}
                </li>
        
                {/* Services Dropdowns */}
                {services.map((service) => (
                    <li 
                        key={service.name} 
                        className="relative group cursor-pointer flex items-center justify-between py-2 text-black"
                        onMouseEnter={() => collapsed && setHoveredItem(service.name)}
                        onMouseLeave={() => collapsed && setHoveredItem(null)}
                    >
                        {/* Left Side: Icon + Name */}
                        <div className="flex items-center gap-3">
                            {service.icon}
                            {!collapsed && <span className="text-lg font-semibold">{service.name}</span>}
                        </div>

                        {/* Arrow Icon */}
                        {!collapsed && <IoIosArrowDown size={20} />}

                        {/* Tooltip for collapsed state */}
                        {collapsed && hoveredItem === service.name && (
                            <div className="absolute left-full ml-2 top-0 w-56 bg-white shadow-lg p-2 z-50 border border-gray-300">
                                <div className="font-semibold border-b pb-2 mb-2">{service.name}</div>
                                <ul>
                                    {service.items.map((item) => (
                                        <li key={item} className="p-2 text-gray-700 hover:bg-gray-200">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Submenu for expanded state */}
                        {!collapsed && (
                            <ul className="absolute left-full top-0 w-56 bg-white shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-gray-300 text-black">
                                {service.items.map((item) => (
                                    <li key={item} className="p-2 text-black hover:bg-gray-200">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
        
                {/* Other Menu Items */}
                {otherMenuItems.slice(1).map((item) => (
                    <li 
                        key={item.name}
                        className="relative flex items-center gap-3 py-2"
                        onMouseEnter={() => collapsed && setHoveredItem(item.name)}
                        onMouseLeave={() => collapsed && setHoveredItem(null)}
                    >
                        {item.icon} 
                        {!collapsed && <span className="text-lg font-semibold text-black">{item.name}</span>}
                        
                        {/* Tooltip for collapsed state */}
                        {collapsed && hoveredItem === item.name && (
                            <div className="absolute left-full ml-2 top-0 bg-white shadow-lg p-2 z-50 border border-gray-300">
                                <div className="font-semibold">{item.name}</div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );    
};

export default Sidebar;