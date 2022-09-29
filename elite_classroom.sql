-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 29, 2022 at 05:22 AM
-- Server version: 10.5.12-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u298279946_elite_classroo`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `user_id` int(11) NOT NULL,
  `class_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `joined_on` datetime NOT NULL DEFAULT current_timestamp(),
  `class_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`user_id`, `class_code`, `joined_on`, `class_name`) VALUES
(2, '528', '2021-02-04 06:08:36', 'DAA'),
(2, '525', '2021-02-04 06:08:45', 'Soft Skills'),
(2, '123', '2021-02-04 06:08:56', 'Maths'),
(1, '123', '2021-02-04 06:09:22', 'Maths'),
(1, '525', '2021-02-04 06:09:31', 'Soft Skills');

-- --------------------------------------------------------

--
-- Table structure for table `classroom`
--

CREATE TABLE `classroom` (
  `class_code` varchar(30) NOT NULL,
  `class_name` varchar(255) NOT NULL,
  `prof_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classroom`
--

INSERT INTO `classroom` (`class_code`, `class_name`, `prof_id`, `created_on`) VALUES
('123', 'Maths', 123, '2021-02-03 15:38:36'),
('525', 'Soft Skills', 123, '2021-02-03 19:41:36'),
('528', 'DAA', 123, '2021-02-03 19:42:06');

-- --------------------------------------------------------

--
-- Table structure for table `class_works`
--

CREATE TABLE `class_works` (
  `work_id` int(11) NOT NULL,
  `class_code` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `type` int(11) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `due_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `current_schedule`
--

CREATE TABLE `current_schedule` (
  `week_no` int(11) NOT NULL,
  `sun` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `mon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `tue` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `wed` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `thu` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `fri` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `sat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `class_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `class_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `last_modified_on` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `current_schedule`
--

INSERT INTO `current_schedule` (`week_no`, `sun`, `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `class_code`, `description`, `class_link`, `last_modified_on`) VALUES
(7, '7:30PM 5:30PM', '10:30 AM', '', '', '', '', '', '525', '', '', '2021-02-24 07:19:53'),
(8, '5:30 PM', '', '', '', '', '', '', '528', '', '', '2021-02-24 07:19:53'),
(7, '', '9:00 AM', '', '', '', '', '', '528', '', '', '2021-02-24 07:19:53'),
(7, '9:00 AM', '', '', '', '', '', '', '528', '', '', '2021-02-24 07:19:53'),
(8, '10:00 AM', '', '', '', '', '', '', '528', '', '', '2021-02-24 07:19:53'),
(8, '', '', '', '', '3:00 PM', '', '', '525', '', '', '2021-02-24 07:19:53'),
(8, '', '', '', '', '5:00 PM', '', '', '525', '', '', '2021-02-24 07:19:53'),
(8, '', '', '', '', '5:00 PM', '', '', '525', '', '', '2021-02-24 07:19:53');

-- --------------------------------------------------------

--
-- Table structure for table `main_schedule`
--

CREATE TABLE `main_schedule` (
  `schedule_id` int(255) NOT NULL,
  `sun` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `mon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `tue` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `wed` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `thu` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `fri` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `sat` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `class_code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `main_schedule`
--

INSERT INTO `main_schedule` (`schedule_id`, `sun`, `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, `class_code`, `created_on`) VALUES
(1, '', '12:00 PM', '9:00 AM', '9:00 AM', '', '', '', '525', '2021-02-07 13:26:10'),
(2, '', '', '', '', '10:30 AM', '10:30 AM', '10:30 AM', '528', '2021-02-23 11:58:18');

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `notes_id` int(11) NOT NULL,
  `class_code` varchar(30) NOT NULL,
  `attachment_id` varchar(255) NOT NULL,
  `posted_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `prof`
--

CREATE TABLE `prof` (
  `prof_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prof`
--

INSERT INTO `prof` (`prof_id`, `email`, `password`, `timestamp`) VALUES
(123, 'abcd@gmail.com', 'abcd', '2021-02-03 15:33:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `google_token` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `name`, `google_token`, `timestamp`) VALUES
(1, 'a@gmail.com', 'Abhishek', '123456', '2021-02-03 06:29:43'),
(2, 'abcd@gmail.com', 'Bhavya', '2019UGCS102', '2021-02-03 19:48:45');

-- --------------------------------------------------------

--
-- Table structure for table `work_submission`
--

CREATE TABLE `work_submission` (
  `submission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `work_id` int(11) NOT NULL,
  `work` text NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `submitted_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`class_code`);

--
-- Indexes for table `class_works`
--
ALTER TABLE `class_works`
  ADD PRIMARY KEY (`work_id`);

--
-- Indexes for table `main_schedule`
--
ALTER TABLE `main_schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`notes_id`);

--
-- Indexes for table `prof`
--
ALTER TABLE `prof`
  ADD PRIMARY KEY (`prof_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `work_submission`
--
ALTER TABLE `work_submission`
  ADD PRIMARY KEY (`submission_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class_works`
--
ALTER TABLE `class_works`
  MODIFY `work_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `main_schedule`
--
ALTER TABLE `main_schedule`
  MODIFY `schedule_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `notes_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prof`
--
ALTER TABLE `prof`
  MODIFY `prof_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `work_submission`
--
ALTER TABLE `work_submission`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
