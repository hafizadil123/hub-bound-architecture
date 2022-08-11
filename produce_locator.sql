-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 21, 2022 at 11:01 AM
-- Server version: 10.6.7-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `produce_locator`
--

-- --------------------------------------------------------

--
-- Table structure for table `billing_info`
--

CREATE TABLE `billing_info` (
  `id` int(11) NOT NULL,
  `business_id` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip_code` varchar(16) DEFAULT NULL,
  `credit_card` varchar(20) DEFAULT NULL,
  `expire_date` varchar(10) DEFAULT NULL,
  `expire_month` varchar(10) DEFAULT NULL,
  `employee_id` varchar(10) NOT NULL,
  `stripe_customer_id` varchar(128) DEFAULT NULL,
  `subscription_date` varchar(16) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `billing_info`
--

INSERT INTO `billing_info` (`id`, `business_id`, `name`, `email`, `state`, `city`, `street`, `zip_code`, `credit_card`, `expire_date`, `expire_month`, `employee_id`, `stripe_customer_id`, `subscription_date`) VALUES
(16, '2', 'test test', 'test@nomail.com', 'Alabama', 'cgfd', '1', '156789', '4242424242424242', '2022', '12', '143', 'cus_LOPqj6o7shWCsC', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `business`
--

CREATE TABLE `business` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `state` varchar(128) DEFAULT NULL,
  `city` varchar(128) DEFAULT NULL,
  `country` varchar(128) DEFAULT NULL,
  `pincode` varchar(128) DEFAULT NULL,
  `latitude` varchar(128) DEFAULT NULL,
  `longitude` varchar(128) DEFAULT NULL,
  `status` varchar(10) DEFAULT '1',
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `created_by` varchar(11) NOT NULL,
  `created_at` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `business`
--

INSERT INTO `business` (`id`, `name`, `type`, `location`, `state`, `city`, `country`, `pincode`, `latitude`, `longitude`, `status`, `firstname`, `lastname`, `email`, `created_by`, `created_at`) VALUES
(6, 'food store', '2', 'New Orleans, LA, USA', '', '', '', '', '29.95106579999999', '-90.0715323', '1', 'test1', 'test1', 'test1@gmail.com', '2', '1633093293');

-- --------------------------------------------------------

--
-- Table structure for table `business_hours`
--

CREATE TABLE `business_hours` (
  `id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `hours` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `business_hours`
--

INSERT INTO `business_hours` (`id`, `business_id`, `employee_id`, `hours`) VALUES
(5, 112, 143, '[{\"dayname\":\"Monday\",\"close\":\"0\",\"timeing\":[{\"start\":\"08:00 AM\",\"end\":\"08:30 AM\"}]},{\"dayname\":\"Tuesday\",\"close\":\"0\",\"timeing\":[{\"start\":\"10:00 AM\",\"end\":\"10:30 AM\"}]},{\"dayname\":\"Wednesday\",\"close\":\"0\",\"timeing\":[{\"start\":\"08:00 AM\",\"end\":\"08:30 AM\"}]},{\"dayname\":\"Thursday\",\"close\":\"0\",\"timeing\":[{\"start\":\"08:00 AM\",\"end\":\"08:30 AM\"}]},{\"dayname\":\"Friday\",\"close\":\"0\",\"timeing\":[{\"start\":\"08:00 AM\",\"end\":\"08:30 AM\"}]},{\"dayname\":\"Saturday\",\"close\":\"0\",\"timeing\":[{\"start\":\"08:00 AM\",\"end\":\"08:30 AM\"}]},{\"dayname\":\"Sunday\",\"close\":\"0\",\"timeing\":[{\"start\":\"08:00 AM\",\"end\":\"08:30 AM\"}]}]');

-- --------------------------------------------------------

--
-- Table structure for table `business_type`
--

CREATE TABLE `business_type` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `business_type`
--

INSERT INTO `business_type` (`id`, `type`) VALUES
(1, 'Convenience store'),
(2, 'Grocery store'),
(3, 'Mobile street vendor'),
(4, 'Virtual grocer'),
(5, 'Liquor Store');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Alcohol'),
(2, 'Babies'),
(3, 'Bakery'),
(4, 'Beverages'),
(5, 'Canned'),
(6, 'Dairy & Eggs'),
(7, 'Dry Goods'),
(8, 'Frozen'),
(9, 'Household'),
(10, 'Meats & Seafood'),
(11, 'Pantry'),
(12, 'Pets'),
(13, 'Prepared'),
(14, 'Produce');

-- --------------------------------------------------------

--
-- Table structure for table `integrations`
--

CREATE TABLE `integrations` (
  `id` int(11) NOT NULL,
  `market_place_type` varchar(10) DEFAULT NULL,
  `pass_on_cost` varchar(10) DEFAULT NULL,
  `order_allowed` varchar(10) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `business_id` varchar(10) DEFAULT NULL,
  `employee_id` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `integrations`
--

INSERT INTO `integrations` (`id`, `market_place_type`, `pass_on_cost`, `order_allowed`, `status`, `business_id`, `employee_id`) VALUES
(3, '2', '3', '2', '1', '6', '2');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `brand_name` varchar(128) DEFAULT NULL,
  `price` varchar(255) NOT NULL,
  `availability` varchar(11) NOT NULL DEFAULT '1',
  `status` varchar(11) DEFAULT '1',
  `category` varchar(11) NOT NULL,
  `business_id` varchar(11) NOT NULL,
  `unit1_quantity` varchar(11) DEFAULT NULL,
  `unit1_type` varchar(255) DEFAULT NULL,
  `unit2_quantity` varchar(11) DEFAULT NULL,
  `unit2_type` varchar(255) DEFAULT NULL,
  `deal_quantity` varchar(11) DEFAULT NULL,
  `deal_price` varchar(255) DEFAULT NULL,
  `employee_id` varchar(11) NOT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_image_ids` varchar(500) NOT NULL DEFAULT '',
  `created_at` varchar(11) NOT NULL,
  `updated_at` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `product_name`, `brand_name`, `price`, `availability`, `status`, `category`, `business_id`, `unit1_quantity`, `unit1_type`, `unit2_quantity`, `unit2_type`, `deal_quantity`, `deal_price`, `employee_id`, `product_image`, `product_image_ids`, `created_at`, `updated_at`) VALUES
(4, 'Banana', 'Local', '50', '1', '1', '1', '6', '5', '3', '5', '6', '5', '20', '4', 'null', '', '1633330940', '1638008915');

-- --------------------------------------------------------

--
-- Table structure for table `migration`
--

CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `migration`
--

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1632984454),
('m130524_201442_init', 1632984462),
('m190124_110200_add_verification_token_column_to_user_table', 1632984463);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `status` varchar(10) DEFAULT NULL,
  `customer_name` varchar(128) DEFAULT NULL,
  `customer_phone` varchar(16) DEFAULT NULL,
  `business_id` varchar(10) DEFAULT NULL,
  `employee_id` varchar(10) DEFAULT NULL,
  `grand_total` varchar(10) DEFAULT NULL,
  `order_total` varchar(10) DEFAULT NULL,
  `tax` varchar(10) DEFAULT NULL,
  `vat` varchar(10) DEFAULT NULL,
  `shiping` varchar(10) DEFAULT NULL,
  `order_date` varchar(128) DEFAULT NULL,
  `pickup_date` varchar(128) DEFAULT NULL,
  `cancel_date` varchar(128) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `status`, `customer_name`, `customer_phone`, `business_id`, `employee_id`, `grand_total`, `order_total`, `tax`, `vat`, `shiping`, `order_date`, `pickup_date`, `cancel_date`, `timestamp`) VALUES
(20, '2', 'jill', '9876543210', '113', NULL, '180', '80', '25', '15', '60', 'NaN', '1650904413', NULL, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `order_line_items`
--

CREATE TABLE `order_line_items` (
  `id` int(11) NOT NULL,
  `order_id` varchar(10) DEFAULT NULL,
  `item_id` varchar(128) DEFAULT NULL,
  `qty` varchar(10) DEFAULT NULL,
  `available` int(11) DEFAULT NULL,
  `price` varchar(10) DEFAULT NULL,
  `note` text DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_line_items`
--

INSERT INTO `order_line_items` (`id`, `order_id`, `item_id`, `qty`, `available`, `price`, `note`) VALUES
(37, '22', '4', '2', NULL, '50', 'this is very good banana');

-- --------------------------------------------------------

--
-- Table structure for table `order_settings`
--

CREATE TABLE `order_settings` (
  `id` int(11) NOT NULL,
  `business_id` varchar(10) DEFAULT NULL,
  `order_accept_status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_settings`
--

INSERT INTO `order_settings` (`id`, `business_id`, `order_accept_status`) VALUES
(2, '6', '0');

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id`, `name`) VALUES
(1, 'Active'),
(2, 'Delivered'),
(3, 'Canceled'),
(4, 'Accepted');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset`
--

CREATE TABLE `password_reset` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `utoken` varchar(100) NOT NULL,
  `is_expired` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `password_reset`
--

INSERT INTO `password_reset` (`id`, `uid`, `utoken`, `is_expired`) VALUES
(1, 132, '4X8kn', 0);

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `performance` int(11) DEFAULT NULL,
  `location` int(11) DEFAULT NULL,
  `inventor` int(11) DEFAULT NULL,
  `business_hours` int(11) DEFAULT NULL,
  `integrations` int(11) DEFAULT NULL,
  `employees` int(11) DEFAULT NULL,
  `payment` int(11) DEFAULT NULL,
  `delete_business` int(11) DEFAULT NULL,
  `order_management` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `uid`, `business_id`, `performance`, `location`, `inventor`, `business_hours`, `integrations`, `employees`, `payment`, `delete_business`, `order_management`) VALUES
(154, 144, 110, 1, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `photo_library`
--

CREATE TABLE `photo_library` (
  `id` int(11) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `category` varchar(128) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `photo_library`
--

INSERT INTO `photo_library` (`id`, `name`, `uid`, `url`, `category`) VALUES
(28, '1649527178812_image.png', NULL, 'https://produceweb.s3-us-east-2.amazonaws.com/1649527178812_image.png', '1');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` int(11) NOT NULL,
  `uid` varchar(11) NOT NULL,
  `business_id` int(11) DEFAULT NULL,
  `products_updates` varchar(11) DEFAULT '0',
  `order_cancel` varchar(11) DEFAULT '0',
  `order_placed` varchar(11) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `uid`, `business_id`, `products_updates`, `order_cancel`, `order_placed`) VALUES
(2, '2', 6, '1', '1', '0');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT 10,
  `role` int(11) NOT NULL,
  `phone` varchar(128) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `profile_pic` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `business_ids` varchar(128) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `social_id` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `password`, `email`, `status`, `role`, `phone`, `profile_pic`, `business_ids`, `created_at`, `updated_at`, `password_reset_token`, `social_id`) VALUES
(2, 'admin', 'admin', '$2a$06$h7VaEVmB7.x6GvHL/wwt6Oq26QVNVSOTPubYikBRHdq.EnjhUSmNS', 'admin@gmail.com', 10, 2, NULL, NULL, '6', 1633442944, 1636973763, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_invitation_mails`
--

CREATE TABLE `user_invitation_mails` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `token` varchar(10) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_invitation_mails`
--

INSERT INTO `user_invitation_mails` (`id`, `uid`, `token`, `status`) VALUES
(1, 2, 'ongG8', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `role`) VALUES
(1, 'admin'),
(2, 'retailer'),
(3, 'employee'),
(4, 'customer');

-- --------------------------------------------------------

--
-- Table structure for table `user_verification_mail`
--

CREATE TABLE `user_verification_mail` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `token` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_verification_mail`
--

INSERT INTO `user_verification_mail` (`id`, `uid`, `token`, `status`) VALUES
(1, 198, 'YC7SU', 0),
(2, 201, 'Mi8MA', 0),
(3, 202, '79rKq', 0),
(4, 203, 'xr6Ib', 0),
(5, 204, '4WcfG', 0),
(6, 206, 'jV7sk', 0),
(7, 207, 'XZvi1', 0),
(8, 223, 'mwZoh', 0),
(9, 224, 'TeS2n', 0),
(10, 228, '5zDA7', 0),
(11, 229, 'tfUac', 0),
(12, 230, '0W0HZ', 0),
(13, 235, 'Dehgk', 0),
(14, 238, 'gWe7e', 0),
(15, 245, 'SHD4n', 0),
(16, 248, 'IMfPv', 0),
(17, 250, 'cmgrq', 0),
(18, 251, 'rib8t', 0),
(19, 254, 'PT4E1', 0),
(20, 255, '2mOjK', 0),
(21, 256, 'bSBbA', 0),
(22, 257, 'DDjPf', 0),
(23, 263, '2LUtd', 0),
(24, 264, 'd2NPf', 0),
(25, 265, 'iIh5u', 0),
(26, 268, '1TjJF', 0),
(27, 269, 'yX43Q', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `billing_info`
--
ALTER TABLE `billing_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `business_hours`
--
ALTER TABLE `business_hours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `business_type`
--
ALTER TABLE `business_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `integrations`
--
ALTER TABLE `integrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migration`
--
ALTER TABLE `migration`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_line_items`
--
ALTER TABLE `order_line_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_settings`
--
ALTER TABLE `order_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset`
--
ALTER TABLE `password_reset`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photo_library`
--
ALTER TABLE `photo_library`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password_reset_token` (`password_reset_token`);

--
-- Indexes for table `user_invitation_mails`
--
ALTER TABLE `user_invitation_mails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_verification_mail`
--
ALTER TABLE `user_verification_mail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `billing_info`
--
ALTER TABLE `billing_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `business`
--
ALTER TABLE `business`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- AUTO_INCREMENT for table `business_hours`
--
ALTER TABLE `business_hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `business_type`
--
ALTER TABLE `business_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `integrations`
--
ALTER TABLE `integrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `order_line_items`
--
ALTER TABLE `order_line_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT for table `order_settings`
--
ALTER TABLE `order_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `password_reset`
--
ALTER TABLE `password_reset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;

--
-- AUTO_INCREMENT for table `photo_library`
--
ALTER TABLE `photo_library`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=270;

--
-- AUTO_INCREMENT for table `user_invitation_mails`
--
ALTER TABLE `user_invitation_mails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_verification_mail`
--
ALTER TABLE `user_verification_mail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
