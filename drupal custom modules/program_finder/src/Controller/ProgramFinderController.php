<?php

namespace Drupal\program_finder\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Controller for the Program Finder module.
 */
class ProgramFinderController extends ControllerBase {

  /**
   * The module handler service.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * Constructs a ProgramFinderController object.
   */
  public function __construct(ModuleHandlerInterface $moduleHandler) {
    $this->moduleHandler = $moduleHandler;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('module_handler')
    );
  }

  /**
   * Renders the program finder page.
   */
  public function content() {
    $module_path = $this->moduleHandler->getModule('program_finder')->getPath();
    $base_url = '/' . $module_path . '/assets';

    return [
      '#theme' => 'program_finder_list',
      '#title' => 'Find Your Program',
      '#data' => [
        'message' => 'Explore our available programs below.',
        'base_url' => $base_url,
      ],
      '#cache' => ['max-age' => 0], // Disable caching during development
    ];
  }

}
