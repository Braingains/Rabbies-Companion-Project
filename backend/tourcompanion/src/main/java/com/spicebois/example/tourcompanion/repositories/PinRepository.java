package com.spicebois.example.tourcompanion.repositories;

import com.spicebois.example.tourcompanion.models.Pin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PinRepository extends JpaRepository<Pin, Long> {
    List<Pin> findByCategory(String category);

//    List<Marker> findByUserIgnoreCase(String user);
}