-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2018 at 05:02 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `evidencijautakmica`
--

-- --------------------------------------------------------

--
-- Table structure for table `domaceekipe`
--

CREATE TABLE `domaceekipe` (
  `id` int(50) NOT NULL,
  `strana` text NOT NULL,
  `naziv` text NOT NULL,
  `bojaDresova` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `domaceekipe`
--

INSERT INTO `domaceekipe` (`id`, `strana`, `naziv`, `bojaDresova`) VALUES
(3, 'Domaci', 'Vrsac', 'Crna'),
(4, 'Domaci', 'Veternik', 'Plava'),
(5, 'Domaci', 'Zrenjanin', 'Ljubicasta');

-- --------------------------------------------------------

--
-- Table structure for table `gostujuceekipe`
--

CREATE TABLE `gostujuceekipe` (
  `id` int(50) NOT NULL,
  `strana` text NOT NULL,
  `naziv` text NOT NULL,
  `bojaDresova` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gostujuceekipe`
--

INSERT INTO `gostujuceekipe` (`id`, `strana`, `naziv`, `bojaDresova`) VALUES
(1, 'Gosti', 'Kovin', 'Zuta'),
(2, 'Gosti', 'Sabac', 'Zlatna'),
(3, 'Gosti', 'Temerin', 'Zuta');

-- --------------------------------------------------------

--
-- Table structure for table `teren`
--

CREATE TABLE `teren` (
  `id` int(50) NOT NULL,
  `naziv` text NOT NULL,
  `nazivDomacina` text NOT NULL,
  `nazivGostiju` text NOT NULL,
  `datumUtakmice` text NOT NULL,
  `cena` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teren`
--

INSERT INTO `teren` (`id`, `naziv`, `nazivDomacina`, `nazivGostiju`, `datumUtakmice`, `cena`) VALUES
(1, 'Matrix', 'Vrsac', 'Kovin', '03/28/2018', '42e'),
(2, 'Koloseum', 'Veternik', 'Sabac', '03/30/2018', '24e'),
(3, 'Bagljas', 'Zrenjanin', 'Temerin', '03/24/2018', '55e');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `domaceekipe`
--
ALTER TABLE `domaceekipe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gostujuceekipe`
--
ALTER TABLE `gostujuceekipe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teren`
--
ALTER TABLE `teren`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `domaceekipe`
--
ALTER TABLE `domaceekipe`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gostujuceekipe`
--
ALTER TABLE `gostujuceekipe`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teren`
--
ALTER TABLE `teren`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
