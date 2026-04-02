-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 03, 2026 at 12:57 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `EPMS`
--
CREATE DATABASE IF NOT EXISTS `EPMS` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `EPMS`;

-- --------------------------------------------------------

--
-- Table structure for table `Department`
--

CREATE TABLE `Department` (
  `departmentCode` varchar(10) NOT NULL,
  `departmentName` varchar(50) NOT NULL,
  `grossSalary` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `Department`
--

TRUNCATE TABLE `Department`;
--
-- Dumping data for table `Department`
--

INSERT INTO `Department` (`departmentCode`, `departmentName`, `grossSalary`) VALUES
('ADMS', 'Administration Staff', 600000.00),
('CW', 'Carwash', 300000.00),
('MC', 'Mechanic', 450000.00),
('NOC', 'NETWORK OPERATION CENTER', 300000.00),
('SOD', 'SOFTWARE DEVELOPER', 2000000.00),
('ST', 'Stock', 200000.00);

-- --------------------------------------------------------

--
-- Table structure for table `Employee`
--

CREATE TABLE `Employee` (
  `employeeNumber` varchar(20) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` text DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `hiredDate` date DEFAULT NULL,
  `departmentCode` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `Employee`
--

TRUNCATE TABLE `Employee`;
--
-- Dumping data for table `Employee`
--

INSERT INTO `Employee` (`employeeNumber`, `firstName`, `lastName`, `address`, `position`, `telephone`, `gender`, `hiredDate`, `departmentCode`, `created_at`) VALUES
('ADMS0001', 'Francis', 'Cleveland', 'Suscipit a sint quia', 'Tempore necessitati', '+1 (579) 437-5458', 'M', '1972-03-28', 'ADMS', '2026-04-02 22:09:09'),
('CW0007', 'Cheyenne', 'Perry', 'Cumque cillum eiusmo', 'Fugit distinctio A', '+1 (983) 389-5807', 'M', '2002-10-07', 'CW', '2026-04-02 22:11:16'),
('MC0002', 'Jane', 'Wilkerson', 'Unde voluptas suscip', 'Consequatur facilis ', '+1 (987) 168-5587', 'M', '2025-01-09', 'MC', '2026-04-02 22:09:09'),
('MC0008', 'Molly', 'Gardner', 'Voluptates ratione s', 'Qui labore pariatur', '+1 (975) 456-4527', 'M', '2013-01-17', 'MC', '2026-04-02 22:11:28'),
('NOC0004', 'Jenna', 'Kirby', 'Mollit id distinctio', 'Alias nobis dolor ap', '+1 (269) 317-6547', 'F', '1998-06-11', 'NOC', '2026-04-02 22:09:09'),
('NOC0005', 'Xerxes', 'Baker', 'Nulla temporibus sus', 'Omnis et nihil autem', '+1 (832) 588-7503', 'M', '2023-10-06', 'NOC', '2026-04-02 22:09:09'),
('NOC0006', 'Ciara', 'Mueller', 'Eveniet ut quia und', 'Quibusdam nisi sit i', '+1 (471) 122-6353', 'F', '1980-01-08', 'NOC', '2026-04-02 22:09:09'),
('SOD0003', 'Stacey', 'Patterson', 'Ea enim blanditiis f', 'Ipsum reiciendis tem', '+1 (319) 824-4601', 'M', '2024-12-30', 'SOD', '2026-04-02 22:09:09');

-- --------------------------------------------------------

--
-- Table structure for table `Salary`
--

CREATE TABLE `Salary` (
  `salaryId` int(11) NOT NULL,
  `employeeNumber` varchar(20) DEFAULT NULL,
  `grossSalary` decimal(10,2) DEFAULT NULL,
  `totalDeduction` decimal(10,2) DEFAULT NULL,
  `netSalary` decimal(10,2) DEFAULT NULL,
  `month` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `Salary`
--

TRUNCATE TABLE `Salary`;
--
-- Dumping data for table `Salary`
--

INSERT INTO `Salary` (`salaryId`, `employeeNumber`, `grossSalary`, `totalDeduction`, `netSalary`, `month`) VALUES
(6, 'ADMS0001', 600000.00, 89000.00, 511000.00, '2026-04'),
(7, 'MC0008', 450000.00, 0.00, 450000.00, '2026-03'),
(8, 'CW0007', 300000.00, 9000.00, 291000.00, '2026-04'),
(9, 'NOC0005', 300000.00, 3400.00, 296600.00, '2026-04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Department`
--
ALTER TABLE `Department`
  ADD PRIMARY KEY (`departmentCode`);

--
-- Indexes for table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`employeeNumber`),
  ADD KEY `idx_employee_dept` (`departmentCode`);

--
-- Indexes for table `Salary`
--
ALTER TABLE `Salary`
  ADD PRIMARY KEY (`salaryId`),
  ADD KEY `idx_salary_employee` (`employeeNumber`),
  ADD KEY `idx_salary_month` (`month`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Salary`
--
ALTER TABLE `Salary`
  MODIFY `salaryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Employee`
--
ALTER TABLE `Employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`departmentCode`) REFERENCES `Department` (`departmentCode`) ON DELETE SET NULL;

--
-- Constraints for table `Salary`
--
ALTER TABLE `Salary`
  ADD CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`employeeNumber`) REFERENCES `Employee` (`employeeNumber`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
