
package com.example.demo.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entidades.Plan;

public interface PlanRepository extends JpaRepository<Plan, Integer> {
}