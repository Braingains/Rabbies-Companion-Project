package com.spicebois.example.tourcompanion.components;


import com.spicebois.example.tourcompanion.models.Pin;
import com.spicebois.example.tourcompanion.repositories.PinRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    PinRepository pinRepository;

    public DataLoader(){

    }

    public void run(ApplicationArguments args) {
        Pin edinburghCastle = new Pin("Edinburgh Castle", "Attraction",  "A big castle", "Ewan", 55.948612, -3.200833);
        pinRepository.save(edinburghCastle);

        Pin stirlingCastle = new Pin("Stirling Castle", "Attraction",  "Another big castle", "Matt", 56.126909, -3.943278);
        pinRepository.save(stirlingCastle);

        Pin fortAugustusBush = new Pin("Fort Augustus Bush", "Attraction",  "Good for a piss", "Ewan", 57.142757, -4.678571);
        pinRepository.save(fortAugustusBush);

        Pin lochLubnaig = new Pin("Loch Lubnaig", "Attraction",  "Decey view", "Matt", 56.277650, -4.283440);
        pinRepository.save(lochLubnaig);
    }

}