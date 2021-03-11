package com.spicebois.example.tourcompanion.controllers;

import com.spicebois.example.tourcompanion.models.Pin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.spicebois.example.tourcompanion.repositories.PinRepository;

import java.util.List;

@RestController
public class PinController {

    @Autowired
    PinRepository pinRepository;

    @GetMapping(value="/pins")
    public ResponseEntity<List<Pin>> getAllPins(){
        return new ResponseEntity<>(pinRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value="/pins/category/{category}")
    public ResponseEntity<List<Pin>> getPinByCategory(@PathVariable String category){
        return new ResponseEntity<>(pinRepository.findByCategory(category), HttpStatus.OK);
    }

    @PostMapping(value="/pins")
    public ResponseEntity<Pin> postPin(@RequestBody Pin pin){
        pinRepository.save(pin);
        return new ResponseEntity<>(pin, HttpStatus.CREATED);
    }

    @PatchMapping(value="/pins/{id}")
    public ResponseEntity<Pin> updatePin(@RequestBody Pin pin){
        pinRepository.save(pin);
        return new ResponseEntity<>(pin, HttpStatus.OK);
    }

    @DeleteMapping(value = "/pins/{id}")
    public ResponseEntity<Pin> deletePin(@PathVariable Long id) {
        Pin found = pinRepository.getOne(id);
        pinRepository.delete(found);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }


}