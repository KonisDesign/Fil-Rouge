-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 05 juin 2023 à 16:25
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `filrouge`
--

-- --------------------------------------------------------

--
-- Structure de la table `projects`
--

CREATE TABLE `projects` (
  `Id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Url` varchar(255) NOT NULL,
  `Tasks` varchar(255) NOT NULL,
  `Notifications` varchar(255) NOT NULL DEFAULT '',
  `Comments` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `projects`
--

INSERT INTO `projects` (`Id`, `Title`, `Description`, `Url`, `Tasks`, `Notifications`, `Comments`) VALUES
(11, 'Netflix 2.0', 'Netflix est une entreprise multinationale américaine créée à Scotts Valley en 1997 par Reed Hastings et Marc Randolph appartenant au secteur d\'activité des industries créatives.', 'netflix-logo.webp', 'Faire le frontend, faire le backend, Ajouter des utilisateurs dans la bdd,gdfgfdg', 'Page d\'accueil terminée', 'test,oui,,'),
(12, 'Wordpress', 'WordPress est un système de gestion de contenu gratuit, libre et open-source. Ce logiciel écrit en PHP repose sur une base de données MySQL et est distribué par la fondation WordPress.org.', 'Avis-WordPress.webp', 'Créer un plugin, Choisir un thème', 'Server web opérationnel ', 'test,bonjour,bonjour'),
(17, 'Facebook', 'Meta Platforms, Inc., plus connue sous le nom commercial Meta, est une société américaine créée en 2004 par Mark Zuckerberg. Elle est un des géants du Web, regroupés sous l\'acronyme GAFAM, aux côtés de Google, Apple, Amazon et Microsoft.', '147926465_m_normal_none.jpg', 'Copier sur snap pour les stories,Copier sur twitter', 'Aucune notification', 'test'),
(22, 'Spotify', 'Spotify est un service suédois de streaming musical sous la forme d\'un logiciel propriétaire et d\'un site web. Cette plateforme de distribution numérique permet une écoute quasi instantanée de fichiers musicaux.', 'open-graph-default.png', 'Aucune tâche', 'Aucune notification', 'tset'),
(24, 'spacex ', 'gdfgdfgd', '1Emblème-SpaceX.jpg', 'gdfgdfg,gfdgfd', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `Firstname` varchar(255) DEFAULT '''''',
  `Lastname` varchar(255) DEFAULT '''''',
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Job` varchar(255) DEFAULT NULL,
  `Projects` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Role` varchar(255) NOT NULL DEFAULT 'user',
  `Url` varchar(255) NOT NULL DEFAULT 'profile.webp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`Id`, `Firstname`, `Lastname`, `Email`, `Password`, `Job`, `Projects`, `Role`, `Url`) VALUES
(37, 'Romain', 'Camerlynck', 'romain.camerlynck@gmail.com', '$2a$11$K6a8xuH1XsbNT8Iyg5DxNuqvAQChc1n0ezmSy16DOQELUdo2EllL2', 'Patron d\'Elon', ',11,12', 'admin', 'profile.webp'),
(38, 'Julien', 'Devos', 'juliendevos@icloud.com', '$2a$11$GIe3lwwBuEmvL5LnicDuKOfCad3pjIEBG.5D0B5XcwNO5i2g1e5XO', 'Patron', '22,11,24', 'user', 'animoji-FA.webp'),
(39, 'hfghf', 'gfhgf', 'main.camerlynck@gmail.com', '$2a$11$PVzDkjBIpJTXbmErRpdTLeCSTyUHffulUYMQ8QyXH5A4EwB/3FIFG', 'hfgh', '', 'user', 'profile.webp');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Id` (`Id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `projects`
--
ALTER TABLE `projects`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
