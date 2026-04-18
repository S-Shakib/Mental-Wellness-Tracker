-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 18, 2026 at 11:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mental_wellness_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

CREATE TABLE `goals` (
  `goal_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `target_days` int(11) NOT NULL,
  `current_days` int(11) DEFAULT 0,
  `category` varchar(50) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mood_records`
--

CREATE TABLE `mood_records` (
  `record_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `mood_level` int(11) NOT NULL,
  `mood_note` text DEFAULT NULL,
  `recorded_date` date DEFAULT NULL,
  `recorded_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mood_records`
--

INSERT INTO `mood_records` (`record_id`, `user_id`, `mood_level`, `mood_note`, `recorded_date`, `recorded_time`) VALUES
(2, 2, 2, 'i havent proper sleep tonight.\n', '2026-04-17', '19:17:55'),
(3, 2, 6, 'i am feeling happy \n', '2026-04-18', '20:18:48');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reminder_id` int(11) DEFAULT NULL,
  `notification_status` varchar(20) DEFAULT 'unread',
  `notification_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reminders`
--

CREATE TABLE `reminders` (
  `reminder_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reminder_time` time DEFAULT NULL,
  `reminder_date` date DEFAULT NULL,
  `reminder_status` varchar(20) DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reminders`
--

INSERT INTO `reminders` (`reminder_id`, `user_id`, `reminder_time`, `reminder_date`, `reminder_status`, `created_at`) VALUES
(2, 2, '20:36:00', '2026-04-18', 'done', '2026-04-18 14:34:32'),
(3, 2, '21:31:00', '2026-04-18', 'done', '2026-04-18 15:29:53'),
(4, 2, '22:04:00', '2026-04-18', 'done', '2026-04-18 16:02:52'),
(5, 2, '22:11:00', '2026-04-18', 'done', '2026-04-18 16:09:38'),
(6, 2, '22:15:00', '2026-04-18', 'done', '2026-04-18 16:14:14'),
(7, 2, '22:29:00', '2026-04-18', 'done', '2026-04-18 16:26:38'),
(8, 2, '22:34:00', '2026-04-18', 'done', '2026-04-18 16:31:33'),
(9, 2, '22:35:00', '2026-04-18', 'done', '2026-04-18 16:34:16'),
(10, 2, '22:42:00', '2026-04-18', 'done', '2026-04-18 16:39:31'),
(11, 2, '22:47:00', '2026-04-18', 'done', '2026-04-18 16:45:36');

-- --------------------------------------------------------

--
-- Table structure for table `sticky_notes`
--

CREATE TABLE `sticky_notes` (
  `note_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `content` text NOT NULL,
  `color` varchar(20) DEFAULT 'yellow',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password_hash`, `age`, `gender`, `created_at`, `is_admin`) VALUES
(1, 'Test User', 'test@test.com', '$2b$10$j7atu.vGXIjKvFiMamHssO5OxLjfPB72FALODMCf.GFAhQZcG5H5m', 22, 'Male', '2026-04-11 19:32:57', 0),
(2, 'Test User', 'mary@test.com', '$2b$10$DemFBTIzS4RwiLt/OQpFtuiDqJmXXb5cr18/P7uWCkooYACKocFRq', 20, 'Female', '2026-04-14 18:40:54', 0),
(4, 'Admin', 'admin@wellness.com', '$2b$10$6NmohEMNmUuHhlBqBsdTPOxNI3dWCYEYxES5j30hMEqrjB2Ya3dX.', 22, 'Male', '2026-04-17 18:04:16', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`goal_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `mood_records`
--
ALTER TABLE `mood_records`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `reminder_id` (`reminder_id`);

--
-- Indexes for table `reminders`
--
ALTER TABLE `reminders`
  ADD PRIMARY KEY (`reminder_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sticky_notes`
--
ALTER TABLE `sticky_notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `goals`
--
ALTER TABLE `goals`
  MODIFY `goal_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mood_records`
--
ALTER TABLE `mood_records`
  MODIFY `record_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reminders`
--
ALTER TABLE `reminders`
  MODIFY `reminder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sticky_notes`
--
ALTER TABLE `sticky_notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `goals`
--
ALTER TABLE `goals`
  ADD CONSTRAINT `goals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `mood_records`
--
ALTER TABLE `mood_records`
  ADD CONSTRAINT `mood_records_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`reminder_id`) REFERENCES `reminders` (`reminder_id`);

--
-- Constraints for table `reminders`
--
ALTER TABLE `reminders`
  ADD CONSTRAINT `reminders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `sticky_notes`
--
ALTER TABLE `sticky_notes`
  ADD CONSTRAINT `sticky_notes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
