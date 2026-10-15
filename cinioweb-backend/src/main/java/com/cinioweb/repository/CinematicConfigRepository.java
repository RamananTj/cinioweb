package com.cinioweb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinioweb.entity.CinematicConfig;

public interface CinematicConfigRepository extends JpaRepository<CinematicConfig, Long> {
    Optional<CinematicConfig> findBySceneId(Long sceneId);

}
